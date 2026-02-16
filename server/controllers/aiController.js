// //controller for enhancing a resume's professional summary 
// //POST: /api/ai/enhance-pro-sum

// import Resume from "../models/Resume.js";
// import ai from '../configs/ai.js'

// export const enhanceProfessionalSummary = async (req, res) => {
//   try {
//     const { userContent } = req.body;

//     if (!userContent) {
//       return res.status(400).json({ message: 'Missing required feilds' })
//     }

//     const response = await ai.chat.completions.create({
//       model: process.env.OPENAI_MODEL,
//       messages: [
//         {
//           role: "system",
//           content: "You are an expert in resume writing.Your task is to enhance the professional summary of a resume.The summary should be 1-2 sentences also highlighting my skills,experience and career objectives.Make it compelling and ATS-friendly and only return text no option or anyhting else."
//         },
//         {
//           role: "user",
//           content: userContent,
//         }
//       ]
//     })

//     const enhancedContent = response.choices[0].message.content;
//     return res.status(200).json({ enhancedContent })
//   } catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }

// //controller for enhancing a resume's job-description
// //POST: /api/ai/enhance-job-desc

// export const enhanceJobDescription = async (req, res) => {
//   try {
//     const { userContent } = req.body;

//     if (!userContent) {
//       return res.status(400).json({ message: 'Missing required feilds' })
//     }

//     const response = await ai.chat.completions.create({
//       model: process.env.OPENAI_MODEL,
//       messages: [
//         {
//           role: "system",
//           content: "You are an expert in resume writing.Your task is to enhance the job description of a resume.The job description should be only 1-2 sentences also highlighting key responsibilities and achievements.Use action verbs and quantifiable results where possible.Make it ATS-friendly and only return text no options or anything else."
//         },
//         {
//           role: "user",
//           content: userContent,
//         }
//       ]
//     })

//     const enhancedContent = response.choices[0].message.content;
//     return res.status(200).json({ enhancedContent })
//   } catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }

// //controller for uploading resume to the database
// //POST: /api/ai/upload-resume


// export const uploadResume = async (req, res) => {
//   try {
//     const { resumeText, title } = req.body;
//     const userId = req.userId;

//     if (!title || !resumeText) {
//       return res.status(400).json({ message: 'Missing required fields: title or resumeText' });
//     }

//     // System prompt for AI
//     const systemPrompt = "You are an expert AI agent that extracts structured resume data.";

//     // User prompt asking AI to return valid JSON only
//     const userPrompt = `
//       Extract data from this resume text:

//       "${resumeText}"

//       Return ONLY valid JSON in this exact format:

//       {
//         "professional_summary": "",
//         "skills": [],
//         "personal_info": {
//           "full_name": "",
//           "email": "",
//           "phone": "",
//           "linkedin": "",
//           "github": "",
//           "website": "",
//           "profession": ""
//         },
//         "experience": [
//           {
//             "company": "",
//             "position": "",
//             "start_date": "",
//             "end_date": "",
//             "description": "",
//             "is_current": false
//           }
//         ],
//         "projects": [
//           {
//             "name": "",
//             "description": "",
//             "type": ""
//           }
//         ],
//         "education": [
//           {
//             "institution": "",
//             "degree": "",
//             "field": "",
//             "graduation_date": "",
//             "gpa": ""
//           }
//         ]
//       }
//     `;

//     // Call OpenAI API
//     const response = await ai.chat.completions.create({
//       model: process.env.OPENAI_MODEL,
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: userPrompt }
//       ]
//     });

//     const aiOutput = response.choices[0].message.content;
//     console.log("AI Output:", aiOutput); // log AI output for debugging

//     let parsedData;
//     try {
//       parsedData = JSON.parse(aiOutput); // Try parsing JSON
//     } catch (err) {
//       console.error("JSON parse error:", err.message);
//       return res.status(500).json({ message: "AI did not return valid JSON. Check console logs." });
//     }

//     // Create resume in DB
//     const newResume = await Resume.create({ userId, title, ...parsedData });

//     return res.status(200).json({ resumeId: newResume._id });

//   } catch (error) {
//     console.error("Upload Resume Error:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };


// controllers/aiController.js

import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";


// ==============================
// Enhance Professional Summary
// ==============================
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
You are an expert resume writer.

Enhance this professional summary into 1–2 ATS-friendly sentences highlighting skills, experience, and career goals.

Return ONLY the improved text.

Summary:
${userContent}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return res.status(200).json({
      enhancedContent: response.text,
    });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ==============================
// Enhance Job Description
// ==============================
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
You are an expert resume writer.

Improve this job description into 1–2 sentences highlighting responsibilities and achievements.

Use action verbs and measurable impact.
Return ONLY the improved text.

Job Description:
${userContent}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return res.status(200).json({
      enhancedContent: response.text,
    });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


// ==============================
// Upload Resume & Extract Data
// ==============================
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!title || !resumeText) {
      return res.status(400).json({
        message: "Missing required fields: title or resumeText",
      });
    }

    const prompt = `
You are an AI that extracts structured resume data.

Resume Text:
${resumeText}

Return ONLY valid JSON in this format:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "full_name": "",
    "email": "",
    "phone": "",
    "linkedin": "",
    "github": "",
    "website": "",
    "profession": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",
      "type": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const aiOutput = response.text;
    console.log("AI Output:", aiOutput);

    let parsedData;
    try {
      parsedData = JSON.parse(aiOutput);
    } catch (err) {
      console.error("JSON parse error:", err.message);
      return res.status(500).json({
        message: "AI did not return valid JSON. Check console logs.",
      });
    }

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    return res.status(200).json({
      resumeId: newResume._id,
    });

  } catch (error) {
    console.error("Upload Resume Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
