// import Navbar from "../components/Navbar";

// export default function UserHome() {
//   return (
//     <div>
//       <Navbar />
//       <div style={{ padding: 30 }}>
//         <h1>User Home</h1>
//         <p>Welcome! This is the normal user area.</p>
//       </div>
//     </div>
//   );
// }

import Navbar from "../components/Navbar";

export default function UserHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            User Home
          </h1>
          <p className="text-gray-600">Welcome! This is the normal user area.</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">You're all set!</h2>
            <p className="text-gray-600">Your user dashboard is ready to use.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
