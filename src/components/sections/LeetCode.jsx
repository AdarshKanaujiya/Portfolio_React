import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./LeetCode.css";

const LEETCODE_USERNAME = "Adarsh_Kanaujiya";
const LEETFETCH_API = process.env.REACT_APP_LEETFETCH_API || "http://localhost:5000/leetcode";



const queries = {
  userPublicProfile: {
    operationName: "userPublicProfile",
    query: `query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile { ranking realName }
      }
    }`,
    variables: (username) => ({ username }),
  },
  userProblemsSolved: {
    operationName: "userProblemsSolved",
    query: `query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        submitStats { acSubmissionNum { difficulty count } }
      }
    }`,
    variables: (username) => ({ username }),
  },
  recentAcSubmissions: {
    operationName: "recentAcSubmissions",
    query: `query recentAcSubmissions($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
      }
    }`,
    variables: (username) => ({ username, limit: 2 }),
  },
  userBadges: {
    operationName: "userBadges",
    query: `query userBadges($username: String!) {
      matchedUser(username: $username) {
        badges { id name displayName icon }
      }
    }`,
    variables: (username) => ({ username }),
  },
};

const LeetCode = ({ variant = "section" }) => {
  const [payload, setPayload] = useState(null);
  const [status, setStatus] = useState("loading");
  const maskRef = useRef(null);

  const setAssistantHidden = (hidden) => {
    document.body.classList.toggle("assistant-hidden", hidden);
  };

  useEffect(() => {
    const fetchEndpoint = async (endpoint, username) => {
      const response = await fetch(LEETFETCH_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: endpoint.query,
          variables: endpoint.variables(username),
          operationName: endpoint.operationName,
        }),
      });

      if (!response.ok) {
        throw new Error("LeetFetch API error");
      }

      return response.json();
    };

    const fetchStats = async () => {
      try {
        const [profile, solved, recent, badges] = await Promise.all([
          fetchEndpoint(queries.userPublicProfile, LEETCODE_USERNAME),
          fetchEndpoint(queries.userProblemsSolved, LEETCODE_USERNAME),
          fetchEndpoint(queries.recentAcSubmissions, LEETCODE_USERNAME),
          fetchEndpoint(queries.userBadges, LEETCODE_USERNAME),
        ]);

        setPayload({ profile, solved, recent, badges });
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchStats();
  }, []);

  const handlePointerMove = (event) => {
    const el = maskRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--mask-x", `${x}px`);
    el.style.setProperty("--mask-y", `${y}px`);
    const host = el.closest(".hero-card");
    if (host) {
      host.style.setProperty("--mask-x", `${x}px`);
      host.style.setProperty("--mask-y", `${y}px`);
    }
  };

  const handlePointerLeave = () => {
    const el = maskRef.current;
    if (!el) return;
    el.style.setProperty("--mask-x", `-999px`);
    el.style.setProperty("--mask-y", `-999px`);
    const host = el.closest(".hero-card");
    if (host) {
      host.style.setProperty("--mask-x", `-999px`);
      host.style.setProperty("--mask-y", `-999px`);
    }
    setAssistantHidden(false);
  };

  const lines = useMemo(() => {
    if (status === "loading") {
      return ["Loading LeetCode stats..."];
    }

    if (status === "error" || !payload) {
      return ["Failed to load LeetCode stats."];
    }

    const profile = payload.profile?.data?.matchedUser;
    const solvedStats = payload.solved?.data?.matchedUser?.submitStats?.acSubmissionNum || [];
    const recentList = payload.recent?.data?.recentAcSubmissionList || [];
    const badgeList = payload.badges?.data?.matchedUser?.badges || [];

    const byDifficulty = solvedStats.reduce((acc, item) => {
      acc[item.difficulty] = item.count;
      return acc;
    }, {});

    const totalSolved = byDifficulty.All || 0;
    const easySolved = byDifficulty.Easy || 0;
    const mediumSolved = byDifficulty.Medium || 0;
    const hardSolved = byDifficulty.Hard || 0;

    const recentTitles = recentList
      .slice(0, 3)
      .map((item) => item.title)
      .join(" • ");

    const topBadges = badgeList
      .slice(0, 3)
      .map((badge) => badge.displayName || badge.name)
      .join(" • ");

    return [
      `LeetCode: ${profile?.username || LEETCODE_USERNAME}`,
      `Ranking: ${profile?.profile?.ranking || "N/A"}`,
      `Solved: ${totalSolved} (E ${easySolved} / M ${mediumSolved} / H ${hardSolved})`,
      recentTitles ? `Recent: ${recentTitles}` : "Recent: No recent solves",
      topBadges ? `Badges: ${topBadges}` : "Badges: None yet",
    ];
  }, [payload, status]);

  const maskCard = (
    <motion.div
      className={`leetcode-mask-card${
        variant === "inline" ? " leetcode-mask-card--inline" : ""
      }`}
      ref={maskRef}
      onMouseEnter={() => setAssistantHidden(true)}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchStart={() => setAssistantHidden(true)}
      onTouchMove={(event) => handlePointerMove(event.touches[0])}
      onTouchEnd={handlePointerLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      role="region"
      aria-live="polite"
    >
      <div className="masked-backdrop">
        {lines.map((line, index) => (
          <span key={`back-${index}`} className="mask-line">
            {line}
          </span>
        ))}
      </div>
      <div className="masked-reveal" aria-hidden="true">
        {lines.map((line, index) => (
          <span key={`reveal-${index}`} className="mask-line">
            {line}
          </span>
        ))}
      </div>
    </motion.div>
  );

  if (variant === "inline") {
    return maskCard;
  }

  return (
    <section className="leetcode-section" id="leetcode">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">LeetCode Spotlight</h2>
          <p className="section-subtitle">
            Hover to reveal the stats behind the mask
          </p>
        </motion.div>

        {maskCard}
      </div>
    </section>
  );
};

export default LeetCode;


// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import "./LeetCode.css";

// const LEETCODE_USERNAME = "Adarsh_Kanaujiya";

// const LeetCode = () => {
//   const [stats, setStats] = useState(null);
//   const [status, setStatus] = useState("loading");
//   const cardRef = useRef(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await fetch(
//           `https://leetcode-stats.tashif.codes/${LEETCODE_USERNAME}`
//         );
//         if (!res.ok) throw new Error("LeetCode API error");
//         const data = await res.json();
//         setStats(data);
//         setStatus("ready");
//       } catch (error) {
//         console.error(error);
//         setStatus("error");
//       }
//     };

//     fetchStats();
//   }, []);

//   const handlePointerMove = (event) => {
//     const card = cardRef.current;
//     if (!card) return;

//     const rect = card.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     // Update CSS variables directly for the mask
//     card.style.setProperty("--mask-x", `${x}px`);
//     card.style.setProperty("--mask-y", `${y}px`);
//   };

//   const handlePointerLeave = () => {
//     const card = cardRef.current;
//     if (!card) return;
//     // Move mask far away
//     card.style.setProperty("--mask-x", "-200px");
//     card.style.setProperty("--mask-y", "-200px");
//   };

//   // Helper to generate the text content
//   const getTextContent = () => {
//     if (status === "loading") return "Loading Stats...";
//     if (status === "error" || !stats) return "Failed to load stats.";

//     return `
// Solved ${stats.totalSolved} Problems
// Ranking: ${stats.ranking}

// Easy: ${stats.easySolved}
// Medium: ${stats.mediumSolved}
// Hard: ${stats.hardSolved}
//     `.trim();
//   };

//   const textContent = getTextContent();

//   return (
//     <section className="leetcode-section" id="leetcode">
//       <div className="container">
//         <motion.div
//           className="section-header"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="section-title">LeetCode Stats</h2>
//           <p className="section-subtitle">Hover over the card to reveal</p>
//         </motion.div>

//         <motion.div
//           className="leetcode-mask-card"
//           ref={cardRef}
//           onMouseMove={handlePointerMove}
//           onMouseLeave={handlePointerLeave}
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           {/* Ghost Layer (Background) */}
//           <div className="masked-backdrop" aria-hidden="true">
//             {textContent}
//           </div>

//           {/* Revealed Layer (Foreground) */}
//           <div className="masked-reveal">
//             {textContent}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default LeetCode;