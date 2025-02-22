import React, { useRef } from "react";

// const Demo = () => {
//   // Sections ke liye references create karo
//   const profileRef = useRef(null);
//   const accountRef = useRef(null);
//   const educationRef = useRef(null);
//   const experienceRef = useRef(null);

//   // Scroll karne ka function
//   const scrollToSection = (ref) => {
//     ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <aside className="fixed top-0 right-0 z-40 w-[22vw] h-screen bg-gray-100 border-s-4 border-black p-4">
//         <ul className="space-y-4">
//           <li>
//             <button
//               onClick={() => scrollToSection(profileRef)}
//               className="block p-2 w-full text-left text-gray-900 rounded-lg hover:bg-gray-200"
//             >
//               Profile
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => scrollToSection(accountRef)}
//               className="block p-2 w-full text-left text-gray-900 rounded-lg hover:bg-gray-200"
//             >
//               Account
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => scrollToSection(educationRef)}
//               className="block p-2 w-full text-left text-gray-900 rounded-lg hover:bg-gray-200"
//             >
//               Education
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => scrollToSection(experienceRef)}
//               className="block p-2 w-full text-left text-gray-900 rounded-lg hover:bg-gray-200"
//             >
//               Experience
//             </button>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <div className="ml-[23vw] w-[75vw] p-6">
//         <section ref={profileRef} className="h-screen bg-blue-100 p-6">
//           <h2 className="text-2xl font-bold">Profile Section</h2>
//         </section>

//         <section ref={accountRef} className="h-screen bg-green-100 p-6">
//           <h2 className="text-2xl font-bold">Account Section</h2>
//         </section>

//         <section ref={educationRef} className="h-screen bg-yellow-100 p-6">
//           <h2 className="text-2xl font-bold">Education Section</h2>
//         </section>

//         <section ref={experienceRef} className="h-screen bg-red-100 p-6">
//           <h2 className="text-2xl font-bold">Experience Section</h2>
//         </section>
//       </div>
//     </div>
//   );
// };


// export default Demo;
import { useContext } from "react";
import { WorkspaceContext } from "../Components/WorkspaceContext";
import Header from "../Components/Header";

const WorkspaceForm = () => {
  const { workspaceData,workspaceId, setWorkspaceId } = useContext(WorkspaceContext);

  return (
    <>
      <Header/> 
    <form className="p-4">
      <h2 className="text-lg font-semibold mb-4">Workspace Detail</h2>
      <div className="mb-4">
        <label className="block mb-1">Name:</label>
        <input 
          type="text" 
          value={workspaceData?.workspace_name || ""} 
          readOnly 
          className="border p-2 w-full" 
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Website:</label>
        <input 
          type="text" 
          value={workspaceData?.website || ""} 
          readOnly 
          className="border p-2 w-full" 
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Join Date:</label>
        <input 
          type="date" 
          value={workspaceData?.join_date || ""} 
          readOnly 
          className="border p-2 w-full" 
          />
      </div>
    </form>
          </>
  );
};

export default WorkspaceForm;

