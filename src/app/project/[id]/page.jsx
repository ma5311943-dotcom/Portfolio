"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import projectsData from "../../../lib/data.json";
import ProjectDetail from "../../../components/ProjectDetails/ProjectDetail";

const ProjectView = () => {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = projectsData.find((p) => p.id === id);

  if (!project)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <h2>Project not found</h2>
      </div>
    );

  const props = { project, onBack: () => router.push("/") };

  return <ProjectDetail {...props} />;
};

export default ProjectView;
