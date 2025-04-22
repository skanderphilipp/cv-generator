// src/components/TemplateEditor/TemplatePreview.tsx
import { useRef } from 'react';
import { Box, Paper, Text, Button, Group } from '@mantine/core';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

interface TemplatePreviewProps {
  template: any;
  data: any;
  cssCode: string;
  htmlStructure: string;
}

const TemplatePreview = ({ template, data, cssCode, htmlStructure }: TemplatePreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  // Helper function to format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Generate PDF from preview
  async function handleGeneratePDF() {
    if (!previewRef.current) return;

    try {
      const dataUrl = await toPng(previewRef.current, { quality: 1.0 });
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Template_Preview.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  // Filter data based on enabled sections
  const getFilteredData = () => {
    const enabledSections = template.sections.filter((section: any) => section.enabled);
    const enabledSectionIds = enabledSections.map((section: any) => section.id);

    // Create filtered data object
    const filteredData = { ...data };

    // Only include sections that are enabled
    if (!enabledSectionIds.includes('skills')) filteredData.skills = [];
    if (!enabledSectionIds.includes('experience')) filteredData.experience = [];
    if (!enabledSectionIds.includes('education')) filteredData.education = [];
    if (!enabledSectionIds.includes('projects')) filteredData.projects = [];
    if (!enabledSectionIds.includes('certifications')) filteredData.certifications = [];
    if (!enabledSectionIds.includes('languages')) filteredData.languages = [];

    return filteredData;
  };

  // Render a section based on section id
  const renderSection = (sectionId: string, sectionName: string) => {
    const filteredData = getFilteredData();

    switch(sectionId) {
      case 'header':
        return (
          <div className="cv-header">
            <h1>{filteredData.personalInfo.firstName} {filteredData.personalInfo.lastName}</h1>
            <p className="cv-title">{filteredData.personalInfo.title}</p>
            <p className="cv-contact">
              {filteredData.personalInfo.email} • {filteredData.personalInfo.phone} • {filteredData.personalInfo.location}
            </p>
          </div>
        );

      case 'summary':
        return (
          <div className="cv-summary-content">
            <p>{filteredData.personalInfo.summary}</p>
          </div>
        );

      case 'skills':
        return (
          <div className="cv-skills-content">
            <div className="cv-skills-list">
              {filteredData.skills.map((skill: any) => (
                <div key={skill.id} className="cv-skill-item">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="cv-experience-content">
            {filteredData.experience.map((exp: any) => (
              <div key={exp.id} className="cv-experience-item">
                <div className="cv-experience-header">
                  <div className="cv-experience-title">{exp.role}</div>
                  <div className="cv-experience-date">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </div>
                </div>
                <div className="cv-experience-company">{exp.company}, {exp.location}</div>
                <div className="cv-experience-description">{exp.description}</div>
                <ul className="cv-experience-achievements">
                  {exp.achievements.map((achievement: string, i: number) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="cv-education-content">
            {filteredData.education.map((edu: any) => (
              <div key={edu.id} className="cv-education-item">
                <div className="cv-education-header">
                  <div className="cv-education-degree">{edu.degree}</div>
                  <div className="cv-education-date">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
                <div className="cv-education-institution">{edu.institution}, {edu.location}</div>
                <div className="cv-education-description">{edu.description}</div>
                <ul className="cv-education-achievements">
                  {edu.achievements.map((achievement: string, i: number) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'projects':
        return (
          <div className="cv-projects-content">
            {filteredData.projects.map((proj: any) => (
              <div key={proj.id} className="cv-project-item">
                <div className="cv-project-header">
                  <div className="cv-project-name">{proj.name}</div>
                  <div className="cv-project-date">
                    {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                  </div>
                </div>
                <div className="cv-project-role">{proj.role}</div>
                <div className="cv-project-description">{proj.description}</div>
                <ul className="cv-project-achievements">
                  {proj.achievements.map((achievement: string, i: number) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
                <div className="cv-project-technologies">
                  <span>Technologies: </span>{proj.technologies.join(', ')}
                </div>
              </div>
            ))}
          </div>
        );

      case 'certifications':
        return (
          <div className="cv-certifications-content">
            {filteredData.certifications.map((cert: any) => (
              <div key={cert.id} className="cv-certification-item">
                <div className="cv-certification-name">{cert.name}</div>
                <div className="cv-certification-issuer">
                  {cert.issuer} - {formatDate(cert.date)}
                </div>
              </div>
            ))}
          </div>
        );

      case 'languages':
        return (
          <div className="cv-languages-content">
            {filteredData.languages.map((lang: any) => (
              <div key={lang.id} className="cv-language-item">
                <span className="cv-language-name">{lang.name}</span>:
                <span className="cv-language-proficiency">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        );

      default:
        // For custom sections
        return (
          <div className="cv-custom-section-content">
            <p>Custom section content for {sectionName}</p>
          </div>
        );
    }
  };

  return (
    <Box>
      <Group position="center" mb="lg">
        <Button onClick={handleGeneratePDF}>Generate PDF Preview</Button>
      </Group>

      <Paper
        ref={previewRef}
        sx={{
          width: '210mm',
          minHeight: '297mm',
          margin: '0 auto',
          padding: '20mm',
          backgroundColor: template.styles?.backgroundColor || '#ffffff',
          color: template.styles?.textColor || '#333333',
          fontFamily: template.styles?.fontFamily || 'Inter, sans-serif',
          fontSize: template.styles?.fontSize || '1rem',
          lineHeight: template.styles?.lineHeight || '1.5',
          transform: 'scale(0.7)',
          transformOrigin: 'top center',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}
      >
        <style>
          {cssCode}
        </style>

        <div className="cv-container">
          {template.sections
            .filter((section: any) => section.enabled)
            .sort((a: any, b: any) => a.order - b.order)
            .map((section: any) => (
              <div key={section.id} className={`cv-section cv-${section.id}`}>
                <h2 className="cv-section-title">{section.name}</h2>
                {renderSection(section.id, section.name)}
              </div>
            ))}
        </div>
      </Paper>
    </Box>
  );
};

export default TemplatePreview;