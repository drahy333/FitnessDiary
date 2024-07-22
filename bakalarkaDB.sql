--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Postgres.app)
-- Dumped by pg_dump version 16.2 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: calories_consumed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calories_consumed (
    id integer NOT NULL,
    consumed integer,
    consumed_max integer,
    date date,
    user_id integer NOT NULL,
    bmr integer,
    burned integer
);


ALTER TABLE public.calories_consumed OWNER TO postgres;

--
-- Name: calories_consumed_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.calories_consumed_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.calories_consumed_id_seq OWNER TO postgres;

--
-- Name: calories_consumed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.calories_consumed_id_seq OWNED BY public.calories_consumed.id;


--
-- Name: cardio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cardio (
    id integer NOT NULL,
    date date,
    exercise text,
    user_id integer,
    calories_burned integer,
    duration text
);


ALTER TABLE public.cardio OWNER TO postgres;

--
-- Name: cardio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cardio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cardio_id_seq OWNER TO postgres;

--
-- Name: cardio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cardio_id_seq OWNED BY public.cardio.id;


--
-- Name: exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercises (
    id integer NOT NULL,
    body_part text,
    user_id integer,
    exercise text,
    date date
);


ALTER TABLE public.exercises OWNER TO postgres;

--
-- Name: exercises_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercises_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercises_id_seq OWNER TO postgres;

--
-- Name: exercises_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exercises_id_seq OWNED BY public.exercises.id;


--
-- Name: food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food (
    id bigint NOT NULL,
    calories integer,
    carbohydrates integer,
    protein integer,
    fats integer,
    food_item text
);


ALTER TABLE public.food OWNER TO postgres;

--
-- Name: food_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.food_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.food_id_seq OWNER TO postgres;

--
-- Name: food_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.food_id_seq OWNED BY public.food.id;


--
-- Name: user_login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_login (
    id integer NOT NULL,
    token text,
    user_id integer
);


ALTER TABLE public.user_login OWNER TO postgres;

--
-- Name: login_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.login_id_seq OWNER TO postgres;

--
-- Name: login_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.login_id_seq OWNED BY public.user_login.id;


--
-- Name: note; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.note (
    id integer NOT NULL,
    cardio_id integer NOT NULL,
    text text
);


ALTER TABLE public.note OWNER TO postgres;

--
-- Name: note_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.note_id_seq OWNER TO postgres;

--
-- Name: note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.note_id_seq OWNED BY public.note.id;


--
-- Name: sets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sets (
    id integer NOT NULL,
    reps integer,
    weight integer,
    user_id integer,
    exercise_id integer,
    working_set boolean
);


ALTER TABLE public.sets OWNER TO postgres;

--
-- Name: sets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sets_id_seq OWNER TO postgres;

--
-- Name: sets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sets_id_seq OWNED BY public.sets.id;


--
-- Name: sleep; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sleep (
    id integer NOT NULL,
    date date NOT NULL,
    user_id integer NOT NULL,
    sleep_stop text,
    sleep_start text NOT NULL,
    energy integer,
    duration text
);


ALTER TABLE public.sleep OWNER TO postgres;

--
-- Name: sleep_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sleep_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sleep_id_seq OWNER TO postgres;

--
-- Name: sleep_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sleep_id_seq OWNED BY public.sleep.id;


--
-- Name: sleep_note; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sleep_note (
    id integer NOT NULL,
    sleep_id integer NOT NULL,
    text text
);


ALTER TABLE public.sleep_note OWNER TO postgres;

--
-- Name: sleep_note_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sleep_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sleep_note_id_seq OWNER TO postgres;

--
-- Name: sleep_note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sleep_note_id_seq OWNED BY public.sleep_note.id;


--
-- Name: user_nutrition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_nutrition (
    id integer NOT NULL,
    amount integer NOT NULL,
    user_id integer NOT NULL,
    food_id integer NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.user_nutrition OWNER TO postgres;

--
-- Name: user_nutrition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_nutrition_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_nutrition_id_seq OWNER TO postgres;

--
-- Name: user_nutrition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_nutrition_id_seq OWNED BY public.user_nutrition.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    weight double precision,
    height integer,
    age integer,
    email text,
    password text,
    gender text,
    username text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: calories_consumed id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calories_consumed ALTER COLUMN id SET DEFAULT nextval('public.calories_consumed_id_seq'::regclass);


--
-- Name: cardio id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cardio ALTER COLUMN id SET DEFAULT nextval('public.cardio_id_seq'::regclass);


--
-- Name: exercises id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises ALTER COLUMN id SET DEFAULT nextval('public.exercises_id_seq'::regclass);


--
-- Name: food id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food ALTER COLUMN id SET DEFAULT nextval('public.food_id_seq'::regclass);


--
-- Name: note id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note ALTER COLUMN id SET DEFAULT nextval('public.note_id_seq'::regclass);


--
-- Name: sets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sets ALTER COLUMN id SET DEFAULT nextval('public.sets_id_seq'::regclass);


--
-- Name: sleep id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sleep ALTER COLUMN id SET DEFAULT nextval('public.sleep_id_seq'::regclass);


--
-- Name: sleep_note id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sleep_note ALTER COLUMN id SET DEFAULT nextval('public.sleep_note_id_seq'::regclass);


--
-- Name: user_login id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_login ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);


--
-- Name: user_nutrition id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition ALTER COLUMN id SET DEFAULT nextval('public.user_nutrition_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: calories_consumed; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.calories_consumed (id, consumed, consumed_max, date, user_id, bmr, burned) FROM stdin;
1	500	2500	2024-04-02	1	1950	250
\.


--
-- Data for Name: cardio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cardio (id, date, exercise, user_id, calories_burned, duration) FROM stdin;
2	2024-04-24	hopkanie	1	12	00:12:22
3	2024-04-24	hop	1	155	00:12:22
4	2024-04-24	qq	1	1	12:22:22
5	2024-04-24	q	1	22	12:22:22
6	2024-05-05	bezkanie	1	550	00:55:12
7	2024-05-05	hopkanie	1	250	01:22:00
8	2024-05-05	aaa	1	12	00:00:00
10	2024-05-06	Back	1	450	01:25:22
11	2024-05-07	Beh	1	400	00:35:22
12	2024-05-07	bicyklovanie	1	500	01:22:53
13	2024-05-01	beh	1	500	00:11:22
14	2024-05-08	bezkovanie	1	1500	02:22:55
15	2024-05-12	beh	1	600	00:55:25
16	2024-05-13	beh	1	520	00:55:22
17	2024-05-13	chodza	1	600	01:25:00
20	2024-05-16	beh	1	500	00:32:12
21	2024-05-27	beh	1	500	00:32:25
23	2024-05-27	b	1	152	12:22:22
24	2024-05-28	hop	1	500	00:55:22
25	2024-05-28	q	1	200	00:22:12
26	2024-06-02	beh	1	500	00:55:22
27	2024-06-05	beh	1	23	11:11:11
\.


--
-- Data for Name: exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercises (id, body_part, user_id, exercise, date) FROM stdin;
67	w	1	hop	2024-05-05
68	qqq	1	ssss	2024-05-05
69	aaa	1	hop2a	2024-05-05
70	b	1	a	2024-05-05
71	b	1	a	2024-05-03
72	b	1	a	2024-05-03
73	b	1	a	2024-05-03
74	b	1	a	2024-05-03
75	b	1	a	2024-05-03
76	c	1	w	2024-05-04
78	qqq	1	wwww	2024-05-05
80	chest	1	bench press	2024-05-07
81	legs	1	squats	2024-05-07
82	shoulders	1	strict press	2024-05-07
83	chest	1	incline press	2024-05-07
84	shoulders	1	lateral raises	2024-05-07
85	chest	1	bench press	2024-05-06
86	chest	1	bench press	2024-05-05
87	chest	1	bench press	2024-05-04
88	chest	1	bench press	2024-05-03
89	chest	1	bench press	2024-04-30
90	shoulders	1	lateral raises	2024-05-06
91	chest	1	bench press	2024-04-26
92	chest	1	chest press	2024-05-07
93	chest	1	bench press	2024-05-08
94	legs	1	squats	2024-05-08
95	shoulders	1	strict press	2024-05-06
96	chest	1	bench press	2024-05-12
97	shoulders	1	strict press	2024-05-12
98	chest	1	bench press	2024-05-13
19	chest	1	incline multi press	2024-04-21
25	legs	1	squats	2024-04-21
36	shoulders	1	lateral	2024-04-21
37	trop	1	hop	2024-04-21
38	trop	1	hopaa	2024-04-21
39	trop	1	hopiii	2024-04-21
40	legs	1	predkopy	2024-04-21
41	kop	1	lop	2024-04-21
42	aa	1	hop	2024-04-20
43	aaa	1	hop	2024-04-22
44	bbb	1	trop	2024-04-22
45	legs	1	squats	2024-04-22
46	chest	1	chest press	2024-04-23
99	shoulders	1	strict press	2024-05-13
100	biceps	1	bicep curls	2024-05-13
101	legs	1	squats	2024-05-13
102	chest	1	bench press	2024-05-16
103	cip	1	hop	2024-05-26
104	chest	1	bench press	2024-05-27
105	chest	1	bench press	2024-06-02
106	shoulders	1	strict press	2024-06-02
57	legs	1	squats	2024-04-24
58	chest	1	hop	2024-04-24
59	aa	1	hop	2024-05-04
60	dd	1	a	2024-05-04
\.


--
-- Data for Name: food; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.food (id, calories, carbohydrates, protein, fats, food_item) FROM stdin;
27	125	6	24	3	kuracie maso
28	100	10	10	10	cubi
29	200	6	24	13	hovadzie mlete
30	12	1	2	3	wwqq
26	125	45	6	2	ryza
\.


--
-- Data for Name: note; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.note (id, cardio_id, text) FROM stdin;
6	2	aaaa
7	2	dsadasdads
8	6	tepovka okolo 120
9	7	hop sem hop tam
10	11	tempo 7"/km
11	12	bol som na petrzalskej hradze
13	20	5km, tempo 6"12'/km, avg. heart rate 150
14	20	trasa dom -> lodenica
\.


--
-- Data for Name: sets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sets (id, reps, weight, user_id, exercise_id, working_set) FROM stdin;
143	12	100	1	96	f
144	12	110	1	96	t
145	10	20	1	97	f
146	8	30	1	97	t
147	18	110	1	98	t
148	20	110	1	98	t
149	10	20	1	99	f
150	12	30	1	99	t
151	14	30	1	99	t
152	12	22	1	100	t
153	12	100	1	101	f
154	12	200	1	101	t
155	12	100	1	102	f
156	15	110	1	102	t
157	12	22	1	103	f
158	18	110	1	104	t
159	12	22	1	105	f
160	15	56	1	105	f
161	12	88	1	106	f
162	25	100	1	105	t
63	12	55	1	36	f
64	22	1	1	37	f
65	12	55	1	38	f
66	12	55	1	38	f
67	12	55	1	40	f
68	12	22	1	41	f
69	12	22	1	42	f
70	125	555	1	43	f
71	5	5	1	44	f
72	12	2	1	44	f
73	12	55	1	41	f
74	12	55	1	45	f
75	12	55	1	46	f
19	12	22	1	19	f
86	12	50	1	57	f
87	5	55	1	58	f
88	5	55	1	58	f
89	12	22	1	59	f
90	12	22	1	60	f
91	55	55	1	60	f
92	12	22	1	67	f
93	12	22	1	76	f
96	1	5	1	69	f
97	1	2	1	78	f
41	12	22	1	19	f
48	5	20	1	25	f
49	10	60	1	25	f
50	8	100	1	25	f
52	55	22	1	19	f
62	12	55	1	36	f
114	12	22	1	80	f
115	8	45	1	80	f
116	6	60	1	80	t
117	12	22	1	81	f
118	1	2	1	82	f
119	12	22	1	83	f
120	10	20	1	84	f
121	8	25	1	84	t
122	1	100	1	81	t
123	20	55	1	85	f
124	12	80	1	86	f
125	10	99	1	87	f
126	10	110	1	88	f
127	15	110	1	85	f
128	6	110	1	86	f
129	2	110	1	89	f
130	5	25	1	90	f
131	10	100	1	91	f
132	9	99	1	91	f
133	1	110	1	91	f
134	10	55	1	92	f
135	2	20	1	81	f
136	12	110	1	93	f
138	12	100	1	94	t
139	8	115	1	93	t
140	10	20	1	95	f
141	8	30	1	95	t
142	8	30	1	95	t
\.


--
-- Data for Name: sleep; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sleep (id, date, user_id, sleep_stop, sleep_start, energy, duration) FROM stdin;
4	2024-05-14	1	08:30	22:30	\N	\N
16	2024-05-26	1	07:11	23:30	8	07:41
17	2024-05-26	1	16:25	14:30	2	01:55
18	2024-05-15	1	12:20	22:00	9	14:20
19	2024-06-02	1	08:30	22:30	8	10:00
20	2024-06-02	1	18:00	16:20	9	01:40
21	2024-06-01	1	09:53	22:22	9	11:31
22	2024-05-31	1	07:22	23:55	5	07:27
23	2024-05-30	1	09:12	00:04	6	09:08
24	2024-05-29	1	09:54	23:00	7	10:54
25	2024-06-04	1	05:22	22:22	10	07:00
26	2024-06-04	1	12:22	22:22	10	14:00
\.


--
-- Data for Name: sleep_note; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sleep_note (id, sleep_id, text) FROM stdin;
3	16	hop sem hop tam
4	17	poobedny napík
5	20	poobedný šlofík na gauči
\.


--
-- Data for Name: user_login; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_login (id, token, user_id) FROM stdin;
34	eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MTc2NzYyODgsImV4cCI6MTcxNzcxMjI4OH0.sIdWkIw3_z02ym9cKY4Gfm1H6za9-lILB0G5zdK030U	1
\.


--
-- Data for Name: user_nutrition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_nutrition (id, amount, user_id, food_id, date) FROM stdin;
89	125	1	27	2024-05-26
91	122	1	29	2024-05-26
92	122	1	29	2024-05-26
93	2	1	27	2024-05-26
94	250	1	29	2024-05-26
95	125	1	27	2024-05-27
96	125	1	27	2024-06-02
97	250	1	26	2024-06-02
98	1000	1	27	2024-06-02
99	500	1	26	2024-06-02
100	1000	1	26	2024-06-01
101	1000	1	27	2024-06-01
102	1000	1	27	2024-05-31
103	925	1	26	2024-05-31
104	1200	1	26	2024-05-30
105	1000	1	27	2024-05-30
106	100	1	30	2024-06-04
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, weight, height, age, email, password, gender, username) FROM stdin;
2	0	0	0	user@gmail.com	user	male	\N
8	77	182	23	ula@gmail.com	ula	male	\N
1	90	153	40	admin@gmail.com	admin	male	\N
\.


--
-- Name: calories_consumed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.calories_consumed_id_seq', 1, true);


--
-- Name: cardio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cardio_id_seq', 27, true);


--
-- Name: exercises_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercises_id_seq', 106, true);


--
-- Name: food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.food_id_seq', 30, true);


--
-- Name: login_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.login_id_seq', 34, true);


--
-- Name: note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.note_id_seq', 14, true);


--
-- Name: sets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sets_id_seq', 162, true);


--
-- Name: sleep_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sleep_id_seq', 26, true);


--
-- Name: sleep_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sleep_note_id_seq', 5, true);


--
-- Name: user_nutrition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_nutrition_id_seq', 106, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: calories_consumed calories_consumed_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calories_consumed
    ADD CONSTRAINT calories_consumed_pkey PRIMARY KEY (id);


--
-- Name: cardio cardio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cardio
    ADD CONSTRAINT cardio_pkey PRIMARY KEY (id);


--
-- Name: users email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email_unique UNIQUE (email);


--
-- Name: exercises exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (id);


--
-- Name: food food_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food
    ADD CONSTRAINT food_pkey PRIMARY KEY (id);


--
-- Name: note note_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_pkey PRIMARY KEY (id);


--
-- Name: sets sets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_pkey PRIMARY KEY (id);


--
-- Name: sleep_note sleep_note_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sleep_note
    ADD CONSTRAINT sleep_note_pkey PRIMARY KEY (id);


--
-- Name: sleep sleep_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sleep
    ADD CONSTRAINT sleep_pkey PRIMARY KEY (id);


--
-- Name: user_nutrition user_nutrition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition
    ADD CONSTRAINT user_nutrition_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: note fk_cardio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT fk_cardio FOREIGN KEY (cardio_id) REFERENCES public.cardio(id);


--
-- Name: sets fk_exercise_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT fk_exercise_id FOREIGN KEY (exercise_id) REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_login fk_login_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_login
    ADD CONSTRAINT fk_login_users FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sleep_note fk_sleep_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sleep_note
    ADD CONSTRAINT fk_sleep_id FOREIGN KEY (sleep_id) REFERENCES public.sleep(id);


--
-- Name: sleep fk_sleep_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sleep
    ADD CONSTRAINT fk_sleep_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: exercises fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sets fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_nutrition fk_user_nutrition_food_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition
    ADD CONSTRAINT fk_user_nutrition_food_id FOREIGN KEY (food_id) REFERENCES public.food(id);


--
-- Name: user_nutrition fk_user_nutrition_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_nutrition
    ADD CONSTRAINT fk_user_nutrition_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

