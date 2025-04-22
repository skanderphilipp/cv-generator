import { Box, Grid, Text, Title, List, Divider } from '@mantine/core';

const ModernTemplate = ({ data, branding }) => {
  // Helper function to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const filteredData = {
    skills: data.skills || [],
    experience: data.experience || [],
    education: data.education || [],
    certifications: data.certifications || [],
    projects: data.projects || [],
    languages: data.languages || []
  };

  return (
    <Box sx={{
      fontFamily: branding.font || 'Inter',
      color: '#333',
      '--primary-color': branding.primaryColor || '#0ea5e9',
      '--secondary-color': branding.secondaryColor || '#64748b'
    }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title order={1} sx={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </Title>
        <Text size="lg" sx={{ color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>
          {data.personalInfo.title}
        </Text>
        <Text size="sm">
          {data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}
        </Text>
      </Box>

      <Grid>
        {/* Left Column - Sidebar */}
        <Grid.Col span={4}>
          {/* Summary */}
          <Box mb="xl">
            <Title order={3} sx={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
              Summary
            </Title>
            <Text size="sm">{data.personalInfo.summary}</Text>
          </Box>

          {/* Skills */}
          {filteredData.skills.length > 0 && (
            <Box mb="xl">
              <Title order={3} sx={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
                Skills
              </Title>
              <List spacing="xs" size="sm">
                {filteredData.skills.map(skill => (
                  <List.Item key={skill.id}>{skill.name}</List.Item>
                ))}
              </List>
            </Box>
          )}

          {/* Languages */}
          {filteredData.languages.length > 0 && (
            <Box mb="xl">
              <Title order={3} sx={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
                Languages
              </Title>
              <List spacing="xs" size="sm">
                {filteredData.languages.map(lang => (
                  <List.Item key={lang.id}>
                    {lang.name}: {lang.proficiency}
                  </List.Item>
                ))}
              </List>
            </Box>
          )}

          {/* Certifications */}
          {filteredData.certifications.length > 0 && (
            <Box mb="xl">
              <Title order={3} sx={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
                Certifications
              </Title>
              <List spacing="md" size="sm">
                {filteredData.certifications.map(cert => (
                  <List.Item key={cert.id}>
                    <Text weight={500}>{cert.name}</Text>
                    <Text size="xs">{cert.issuer} - {formatDate(cert.date)}</Text>
                  </List.Item>
                ))}
              </List>
            </Box>
          )}
        </Grid.Col>

        {/* Right Column - Main Content */}
        <Grid.Col span={8}>
          {/* Experience */}
          {filteredData.experience.length > 0 && (
            <Box mb="xl">
              <Title order={3} sx={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
                Experience
              </Title>

              {filteredData.experience.map((exp, index) => (
                <Box key={exp.id} mb={index < filteredData.experience.length - 1 ? 'md' : 0}>
                  <Grid gutter="xs">
                    <Grid.Col span={8}>
                      <Text weight={600}>{exp.role}</Text>
                      <Text size="sm">{exp.company}, {exp.location}</Text>
                    </Grid.Col>
                    <Grid.Col span={4} sx={{ textAlign: 'right' }}>
                      <Text size="sm" color="dimmed">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </Text>
                    </Grid.Col>
                  </Grid>
                  <Text size="sm" mt="xs">{exp.description}</Text>
                  <List size="sm" withPadding mt="xs">
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
              <Title order={3} sx={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
                Education
              </Title>

              {filteredData.education.map((edu, index) => (
                <Box key={edu.id} mb={index < filteredData.education.length - 1 ? 'md' : 0}>
                  <Grid gutter="xs">
                    <Grid.Col span={8}>
                      <Text weight={600}>{edu.degree}</Text>
                      <Text size="sm">{edu.institution}, {edu.location}</Text>
                    </Grid.Col>
                    <Grid.Col span={4} sx={{ textAlign: 'right' }}>
                      <Text size="sm" color="dimmed">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </Text>
                    </Grid.Col>
                  </Grid>
                  <Text size="sm" mt="xs">{edu.description}</Text>
                  <List size="sm" withPadding mt="xs">
                    {edu.achievements.map((achievement, i) => (
                      <List.Item key={i}>{achievement}</List.Item>
                    ))}
                  </List>
                </Box>
              ))}
            </Box>
          )}

          {/* Projects */}
          {filteredData.projects.length > 0 && (
            <Box>
              <Title order={3} sx={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
                Projects
              </Title>

              {filteredData.projects.map((proj, index) => (
                <Box key={proj.id} mb={index < filteredData.projects.length - 1 ? 'md' : 0}>
                  <Grid gutter="xs">
                    <Grid.Col span={8}>
                      <Text weight={600}>{proj.name}</Text>
                      <Text size="sm">{proj.role}</Text>
                    </Grid.Col>
                    <Grid.Col span={4} sx={{ textAlign: 'right' }}>
                      <Text size="sm" color="dimmed">
                        {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                      </Text>
                    </Grid.Col>
                  </Grid>
                  <Text size="sm" mt="xs">{proj.description}</Text>
                  <List size="sm" withPadding mt="xs">
                    {proj.achievements.map((achievement, i) => (
                      <List.Item key={i}>{achievement}</List.Item>
                    ))}
                  </List>
                  <Text size="xs" mt="xs" color="dimmed">
                    Technologies: {proj.technologies.join(', ')}
                  </Text>
                </Box>
              ))}
            </Box>
          )}
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default ModernTemplate;
