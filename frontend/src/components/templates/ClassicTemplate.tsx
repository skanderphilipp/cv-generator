import { Box, Text, Title, List, Divider } from "@mantine/core";

const ClassicTemplate = ({ data, branding }: any) => {
  // Helper function to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const filteredData = {
    skills: data.skills || [],
    experience: data.experience || [],
    education: data.education || [],
    certifications: data.certifications || [],
    projects: data.projects || [],
    languages: data.languages || [],
  };

  return (
    <Box
      sx={{
        fontFamily: branding.font || "Georgia, serif",
        color: "#333",
        "--primary-color": branding.primaryColor || "#0ea5e9",
        "--secondary-color": branding.secondaryColor || "#64748b",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
        {branding.logo && (
          <Box sx={{ textAlign: "center", marginBottom: "1rem" }}>
            <img
              src={branding.logo}
              alt="Company Logo"
              style={{ maxHeight: "40px" }}
            />
          </Box>
        )}
        <Title order={1} sx={{ marginBottom: "0.5rem" }}>
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </Title>
        <Text size="lg" sx={{ marginBottom: "0.5rem" }}>
          {data.personalInfo.title}
        </Text>
        <Text size="sm">
          {data.personalInfo.email} • {data.personalInfo.phone} •{" "}
          {data.personalInfo.location}
        </Text>
      </Box>

      {/* Summary */}
      <Box mb="xl">
        <Title
          order={2}
          sx={{
            borderBottom: `2px solid var(--primary-color)`,
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          Professional Summary
        </Title>
        <Text>{data.personalInfo.summary}</Text>
      </Box>

      {/* Experience */}
      {filteredData.experience.length > 0 && (
        <Box mb="xl">
          <Title
            order={2}
            sx={{
              borderBottom: `2px solid var(--primary-color)`,
              paddingBottom: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            Professional Experience
          </Title>

          {filteredData.experience.map((exp, index) => (
            <Box
              key={exp.id}
              mb={index < filteredData.experience.length - 1 ? "xl" : 0}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Text weight={700} size="lg">
                  {exp.company}
                </Text>
                <Text>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Text>
              </Box>
              <Text weight={600} italic>
                {exp.role}, {exp.location}
              </Text>
              <Text mt="sm">{exp.description}</Text>
              <List mt="sm">
                {exp.achievements.map((achievement, i) => (
                  <List.Item key={i}>{achievement}</List.Item>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {filteredData.education.length > 0 && (
        <Box mb="xl">
          <Title
            order={2}
            sx={{
              borderBottom: `2px solid var(--primary-color)`,
              paddingBottom: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            Education
          </Title>

          {filteredData.education.map((edu, index) => (
            <Box
              key={edu.id}
              mb={index < filteredData.education.length - 1 ? "xl" : 0}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Text weight={700} size="lg">
                  {edu.institution}
                </Text>
                <Text>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
              </Box>
              <Text weight={600} italic>
                {edu.degree}, {edu.location}
              </Text>
              <Text mt="sm">{edu.description}</Text>
              <List mt="sm">
                {edu.achievements.map((achievement, i) => (
                  <List.Item key={i}>{achievement}</List.Item>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      )}

      {/* Skills */}
      {filteredData.skills.length > 0 && (
        <Box mb="xl">
          <Title
            order={2}
            sx={{
              borderBottom: `2px solid var(--primary-color)`,
              paddingBottom: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            Skills
          </Title>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {filteredData.skills.map((skill) => (
              <Box
                key={skill.id}
                sx={{
                  background: "var(--secondary-color)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                {skill.name}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Projects */}
      {filteredData.projects.length > 0 && (
        <Box mb="xl">
          <Title
            order={2}
            sx={{
              borderBottom: `2px solid var(--primary-color)`,
              paddingBottom: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            Projects
          </Title>

          {filteredData.projects.map((proj, index) => (
            <Box
              key={proj.id}
              mb={index < filteredData.projects.length - 1 ? "xl" : 0}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Text weight={700} size="lg">
                  {proj.name}
                </Text>
                <Text>
                  {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                </Text>
              </Box>
              <Text weight={600} italic>
                {proj.role}
              </Text>
              <Text mt="sm">{proj.description}</Text>
              <List mt="sm">
                {proj.achievements.map((achievement, i) => (
                  <List.Item key={i}>{achievement}</List.Item>
                ))}
              </List>
              <Text mt="sm" size="sm">
                <strong>Technologies:</strong> {proj.technologies.join(", ")}
              </Text>
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {/* Certifications */}
        {filteredData.certifications.length > 0 && (
          <Box sx={{ flex: "1 1 45%" }}>
            <Title
              order={2}
              sx={{
                borderBottom: `2px solid var(--primary-color)`,
                paddingBottom: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              Certifications
            </Title>
            <List>
              {filteredData.certifications.map((cert) => (
                <List.Item key={cert.id}>
                  <Text weight={600}>{cert.name}</Text>
                  <Text size="sm">
                    {cert.issuer} - {formatDate(cert.date)}
                  </Text>
                </List.Item>
              ))}
            </List>
          </Box>
        )}

        {/* Languages */}
        {filteredData.languages.length > 0 && (
          <Box sx={{ flex: "1 1 45%" }}>
            <Title
              order={2}
              sx={{
                borderBottom: `2px solid var(--primary-color)`,
                paddingBottom: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              Languages
            </Title>
            <List>
              {filteredData.languages.map((lang) => (
                <List.Item key={lang.id}>
                  <strong>{lang.name}:</strong> {lang.proficiency}
                </List.Item>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ClassicTemplate;
