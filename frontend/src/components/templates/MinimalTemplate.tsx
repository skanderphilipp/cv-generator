import { Box, Text, Title, List, Divider } from "@mantine/core";

const MinimalTemplate = ({ data, branding }) => {
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
        fontFamily: branding.font || "Inter, sans-serif",
        color: "#333",
        "--primary-color": branding.primaryColor || "#0ea5e9",
        "--secondary-color": branding.secondaryColor || "#64748b",
        lineHeight: 1.5,
        letterSpacing: "0.01em",
      }}
    >
      {/* Header - Super minimal */}
      <Box mb="xl">
        <Title
          order={1}
          sx={{
            fontWeight: 300,
            fontSize: "2.25rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--primary-color)",
          }}
        >
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </Title>
        <Text
          sx={{
            fontSize: "1rem",
            fontWeight: 400,
            color: "var(--secondary-color)",
            marginTop: "0.25rem",
          }}
        >
          {data.personalInfo.title}
        </Text>
        <Text
          sx={{
            marginTop: "0.5rem",
            fontSize: "0.8rem",
          }}
        >
          {data.personalInfo.email} • {data.personalInfo.phone} •{" "}
          {data.personalInfo.location}
        </Text>
      </Box>

      {/* Summary - Clean and simple */}
      <Box mb="lg">
        <Text>{data.personalInfo.summary}</Text>
      </Box>

      <Divider my="lg" />

      {/* Experience */}
      {filteredData.experience.length > 0 && (
        <Box mb="xl">
          <Title
            order={2}
            sx={{
              fontSize: "1.2rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}
          >
            Experience
          </Title>

          {filteredData.experience.map((exp, index) => (
            <Box
              key={exp.id}
              mb={index < filteredData.experience.length - 1 ? "lg" : 0}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <Text weight={600}>{exp.role}</Text>
                <Text size="sm">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Text>
              </Box>
              <Text size="sm" color="dimmed" mb="xs">
                {exp.company}, {exp.location}
              </Text>
              <Text size="sm">{exp.description}</Text>
              <Box sx={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                {exp.achievements.map((achievement, i) => (
                  <Text key={i} size="sm" mb="xs">
                    • {achievement}
                  </Text>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Divider my="lg" />

      {/* Education */}
      {filteredData.education.length > 0 && (
        <Box mb="xl">
          <Title
            order={2}
            sx={{
              fontSize: "1.2rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}
          >
            Education
          </Title>

          {filteredData.education.map((edu, index) => (
            <Box
              key={edu.id}
              mb={index < filteredData.education.length - 1 ? "lg" : 0}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <Text weight={600}>{edu.degree}</Text>
                <Text size="sm">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
              </Box>
              <Text size="sm" color="dimmed" mb="xs">
                {edu.institution}, {edu.location}
              </Text>
              <Text size="sm">{edu.description}</Text>
              <Box sx={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                {edu.achievements.map((achievement, i) => (
                  <Text key={i} size="sm" mb="xs">
                    • {achievement}
                  </Text>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Divider my="lg" />

      {/* Two column for Skills and Languages */}
      <Box sx={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
        {/* Skills */}
        {filteredData.skills.length > 0 && (
          <Box sx={{ flex: "1 1 auto" }}>
            <Title
              order={2}
              sx={{
                fontSize: "1.2rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Skills
            </Title>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {filteredData.skills.map((skill) => (
                <Text
                  key={skill.id}
                  size="sm"
                  sx={{
                    background: "#f1f5f9",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "2px",
                  }}
                >
                  {skill.name}
                </Text>
              ))}
            </Box>
          </Box>
        )}

        {/* Languages */}
        {filteredData.languages.length > 0 && (
          <Box sx={{ flex: "0 1 auto", minWidth: "200px" }}>
            <Title
              order={2}
              sx={{
                fontSize: "1.2rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Languages
            </Title>
            <Box>
              {filteredData.languages.map((lang) => (
                <Text key={lang.id} size="sm" mb="xs">
                  <strong>{lang.name}</strong> · {lang.proficiency}
                </Text>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      <Divider my="lg" />

      {/* Projects */}
      {filteredData.projects.length > 0 && (
        <Box mb="xl">
          <Title
            order={2}
            sx={{
              fontSize: "1.2rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}
          >
            Projects
          </Title>

          {filteredData.projects.map((proj, index) => (
            <Box
              key={proj.id}
              mb={index < filteredData.projects.length - 1 ? "lg" : 0}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <Text weight={600}>{proj.name}</Text>
                <Text size="sm">
                  {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                </Text>
              </Box>
              <Text size="sm" color="dimmed" mb="xs">
                {proj.role}
              </Text>
              <Text size="sm">{proj.description}</Text>
              <Box sx={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                {proj.achievements.map((achievement, i) => (
                  <Text key={i} size="sm" mb="xs">
                    • {achievement}
                  </Text>
                ))}
              </Box>
              <Text size="xs" mt="xs" sx={{ color: "var(--primary-color)" }}>
                {proj.technologies.join(" · ")}
              </Text>
            </Box>
          ))}
        </Box>
      )}

      <Divider my="lg" />

      {/* Certifications */}
      {filteredData.certifications.length > 0 && (
        <Box>
          <Title
            order={2}
            sx={{
              fontSize: "1.2rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}
          >
            Certifications
          </Title>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
            {filteredData.certifications.map((cert) => (
              <Box key={cert.id}>
                <Text weight={600} size="sm">
                  {cert.name}
                </Text>
                <Text size="xs">
                  {cert.issuer} · {formatDate(cert.date)}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Branding footer - subtle */}
      {branding.logo && (
        <Box
          mt="xl"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: "1rem",
            borderTop: "1px solid #eee",
          }}
        >
          <Text size="xs" color="dimmed" mr="xs">
            Provided by
          </Text>
          <img
            src={branding.logo}
            alt="Company Logo"
            style={{ height: "20px" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default MinimalTemplate;
