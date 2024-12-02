import {useEffect, useState} from 'react';
import {ResumeData} from '../types/resume';
import {BookOpen, Dribbble, Edit3, GitHub, Globe, Link as LinkIcon, Linkedin, Twitter} from 'react-feather';
import {employee} from "../icons";

interface ResumePreviewProps {
    data: ResumeData;
}

const PLATFORM_ICONS: Record<string, React.FC> = {
    linkedin: Linkedin,
    github: GitHub,
    twitter: Twitter,
    portfolio: Globe,
    dribbble: Dribbble,
    medium: BookOpen,
    devto: Edit3,
    custom: LinkIcon
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({data}) => {
    const [svgContent, setSvgContent] = useState<string>('');
    const [isTypstReady, setTypstReady] = useState(false);

    useEffect(() => {
        const initializeTypst = () => {
            if (window.$typst) {
                setTypstReady(true);
            }
        };

        // Check for Typst availability
        const checkTypst = setInterval(() => {
            if (window.$typst) {
                clearInterval(checkTypst);
                initializeTypst();
            }
        }, 100);
    }, []);

    const convertBasicInformation = (data: ResumeData) => {
        return `
        = ${data?.firstName || ''} ${data?.lastName || ''}
        ${data?.position || '' }        
        
        `;
    }

    const renderProfile = (data: ResumeData) => {
        return `
            == Profile
            ${data?.summary || ''}
        `
    }

    const renderEmploymentHistory = (data: ResumeData) => {
        if (data?.experiences.length === 0) {
            return '';
        }

        return `
            ==   Employment History
            ${data?.experiences.map((experience) => {
            return `
                === ${experience.company}
                ${experience.position}
                ${experience.startDate} - ${experience.isPresent ? 'Present' : experience.endDate}
                ${experience.descriptions.map(des => {
                    return `
                        - #text("${des.text}")
                    `    
                }).join('\n')}
            `;
        }).join('')}
        `;
    }

    const convertToTypstSyntax = (data: ResumeData) => {
        // This is a basic example - expand based on your Typst syntax needs
        return `
        #import "@preview/fontawesome:0.5.0": *
        #set page(margin: 1.5cm)
        #set text(font: "Roboto", size: 14pt)
        
        ${convertBasicInformation(data)} 
        \\ 
        ${renderProfile(data)} 
        \\
        ${renderEmploymentHistory(data)}
         
      `;
    };

    const downloadPdf = async () => {
        try {
            const typstContent = convertToTypstSyntax(data);
            const pdf = await window.$typst.pdf({mainContent: typstContent});
            const blob = new Blob([pdf], {type: 'application/pdf'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.pdf';
            a.click();
        } catch (error) {
            alert("Failed to generate PDF. Please check the console for more information.");
        }
    }

    useEffect(() => {
        if (!isTypstReady) return;

        // @ts-ignore
        const compileContent = async () => {
            try {
                const typstContent = convertToTypstSyntax(data);
                const svg = await window.$typst.svg({mainContent: typstContent});
                setSvgContent(svg);
            } catch (error) {
                console.log(error)
                // alert("Failed to compile resume. Please check the console for more information.");
            }
        };

        compileContent();
    }, [data, isTypstReady]);

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>

                <button
                    onClick={downloadPdf}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Download PDF
                </button>
            </div>

            <div className="bg-white p-8 shadow-lg" id="resume-preview">
                <div
                    id="content"
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{__html: svgContent}}
                />
            </div>
        </>
    );
};
