import express from 'express';
// import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

// const transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:process.env.EMAIL_USER,
//         pass:process.env.EMAIL_PASS,
//     }
// });

// app.post("/send-email",async(req,res)=>{
//     const{name,email,message}=req.body;

//     try{
//         await transporter.sendMail({
//             from:email,
//             to:process.env.EMAIL_USER,
//             subject: `Portfolio Contact from: ${name}`,
//       html: `
//         <h3>New Message</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Message:</b> ${message}</p>
//       `
//     });

//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// });



const PORT = process.env.PORT || 5000; // fallback for local dev
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.post("/leetcode", async (req, res) => {
  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("LeetCode proxy error:", error);
    res.status(500).json({ error: "LeetCode proxy failed" });
  }
});