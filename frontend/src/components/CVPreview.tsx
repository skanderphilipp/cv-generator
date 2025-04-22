import { useEffect, useRef, useState } from 'react';
import { Paper, Button, Group } from '@mantine/core';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const CVPreview = ({ cvData, selectedItems, template, branding }) => {
  const previewRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const filterData = () => {
    return {
      ...cvData,
      skills: cvData.skills.filter(skill =>
        selectedItems.skills.includes(skill.id)
      ),
      experience: cvData.experience.filter(exp =>
        selectedItems.experience.includes(exp.id)
      ),
      education: cvData.education.filter(edu =>
        selectedItems.education.includes(edu.id)
      ),
      certifications: cvData.certifications.filter(cert =>
        selectedItems.certifications.includes(cert.id)
      ),
      projects: cvData.projects.filter(proj =>
        selectedItems.projects.includes(proj.id)
      ),
      languages: cvData.languages.filter(lang =>
        selectedItems.languages.includes(lang.id)
      )
    };
  };

  const renderTemplate = () => {
    const filteredData = filterData();

    switch(template) {
      case 'modern':
        return <ModernTemplate data={filteredData} branding={branding} />;
      case 'classic':
        return <ClassicTemplate data={filteredData} branding={branding} />;
      case 'minimal':
        return <MinimalTemplate data={filteredData} branding={branding} />;
      default:
        return <ModernTemplate data={filteredData} branding={branding} />;
    }
  };

  const generatePDF = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);

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
      pdf.save(`${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}_CV.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadHTML = () => {
    if (!previewRef.current) return;

    const htmlContent = previewRef.current.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    saveAs(blob, `${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}_CV.html`);
  };

  return (
    <div>
      <Group position="center" mb="md">
        <Button onClick={generatePDF} loading={isGenerating}>
          Generate PDF
        </Button>
        <Button variant="outline" onClick={downloadHTML}>
          Download HTML
        </Button>
      </Group>

      <Paper
        ref={previewRef}
        sx={{
          width: '210mm',
          minHeight: '297mm',
          margin: '0 auto',
          padding: '10mm',
          backgroundColor: 'white',
          boxSizing: 'border-box',
          transform: 'scale(0.7)',
          transformOrigin: 'top center'
        }}
      >
        {renderTemplate()}
      </Paper>
    </div>
  );
};

export default CVPreview;
