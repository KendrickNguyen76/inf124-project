const axios = require('axios');

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const LANGUAGE_IDS = {
  python: 71,
  javascript: 63,
  java: 62,
  cpp: 54
};

exports.executeCode = async (req, res) => {
  const { code, language, testCases } = req.body;
  try {
    // Prepare stdin for Judge0 (first test case for simplicity)
    const stdin = JSON.stringify(testCases[0].input);

    // Submit code to Judge0
    const submission = await axios.post(
      `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id: LANGUAGE_IDS[language],
        stdin
      },
      {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );

    res.json(submission.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};