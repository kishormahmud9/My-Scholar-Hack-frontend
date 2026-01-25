export default function Settings() {
    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Settings</h1>

            <div className="max-w-4xl space-y-4 sm:space-y-6">
                {/* Profile Settings */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                    <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-900">Profile Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                defaultValue="Admin User"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                defaultValue="admin@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* System Settings */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                    <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-900">System Settings</h2>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                            <span className="text-sm sm:text-base text-gray-700">Email notifications</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                            <span className="text-sm sm:text-base text-gray-700">User activity alerts</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600" />
                            <span className="text-sm sm:text-base text-gray-700">System maintenance notifications</span>
                        </label>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
