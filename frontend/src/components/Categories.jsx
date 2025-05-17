

export const Catogories = ({categories}) => {

    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-16">
            <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Categories 
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                    {categories.map((category) =>(
                        <div
                        key = {category.name}
                        className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center 
                        cursor-pointer hover:shadow-lg transition duration-300"
                        >
                           <div className="text-4xl mb-2">{category.icon}</div>
                           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {category.name}
                           </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};