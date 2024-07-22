
import React from 'react';

function DataDisplay({ data, bgColor}) {
    return (
        <div className="flex flex-wrap lg:flex-nowrap justify-center ">
            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                {data.map((item) => (
                    <div key={item.name} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl flex flex-col items-center justify-center">
                        <button
                            type="button"
                            style={{ backgroundColor: bgColor, width: '64px', height: '64px' }} // Ensure width and height are equal
                            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                        >
                            {item.icon}
                        </button>
                        <p className="mt-3 text-center">
                            <span className="text-lg font-semibold">{item.amount}</span>
                            <span className={`text-sm text-${item.pcColor} ml-2`}>
                                {/* {item.percentage} */}
                            </span>
                        </p>
                        <p className="text-sm text-gray-400 mt-1 text-center">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataDisplay;
