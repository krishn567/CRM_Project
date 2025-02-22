import { createContext, useState, useEffect } from "react";

 export  const WorkspaceContext = createContext();

 export const WorkspaceProvider = ({ children }) => {
  const [workspaceId, setWorkspaceId] = useState(localStorage.getItem("workspaceId") || "");
  const [workspaceData, setWorkspaceData] = useState(null);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      if (!workspaceId) return; // Agar koi workspace select nahi hai toh API call nahi hoga
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/workspace/${workspaceId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();
        setWorkspaceData(result.data);
      } catch (error) {
        console.error("Error fetching workspace data:", error);
      }
    };

    fetchWorkspaceData();
  }, [workspaceId]); // 

  return (
    <WorkspaceContext.Provider value={{ workspaceId, setWorkspaceId, workspaceData }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
 