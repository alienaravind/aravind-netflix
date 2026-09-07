const {onRequest} = require("firebase-functions/v2/https");
const {defineSecret} = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const OpenAI = require("openai");

const tmdbApiKey = defineSecret("TMDB_API_KEY");
const openaiApiKey = defineSecret("OPENAI_API_KEY");

exports.openaiConnection = onRequest(
    {
      secrets: [openaiApiKey],
      cors: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://aravind-netflix.vercel.app",
      ],
      invoker: "public",
    },
    async (req, res) => {
      try {
        const {prompt} = req.body;

        if (!prompt) {
          return res.status(400).json({
            success: false,
            message: "Prompt is required",
          });
        }

        const openai = new OpenAI({
          apiKey: openaiApiKey.value(),
        });

        const response = await openai.responses.create({
          model: "gpt-5-nano",
          input: prompt,
        });

        return res.status(200).json({
          success: true,
          response: response.output_text,
        });
      } catch (error) {
        logger.error("OpenAI request failed", error);

        return res.status(500).json({
          success: false,
          message: "OpenAI request failed",
        });
      }
    },
);

exports.tmdbConnection = onRequest(
    {
      secrets: [tmdbApiKey],
      cors: true,
    },
    async (req, res) => {
      try {
        const {endpoint} = req.body;

        if (!endpoint) {
          return res.status(400).json({
            success: false,
            message: "TMDB endpoint is required",
          });
        }

        const allowedEndpoints = [
          "now_playing",
          "popular",
          "top_rated",
          "upcoming",
        ];

        if (!allowedEndpoints.includes(endpoint)) {
          return res.status(400).json({
            success: false,
            message: "Invalid TMDB endpoint",
          });
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${tmdbApiKey.value()}`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
              },
            },
        );

        if (!response.ok) {
          throw new Error(`TMDB request failed with status ${response.status}`);
        }

        const data = await response.json();

        return res.status(200).json({
          success: true,
          data: data,
        });
      } catch (error) {
        logger.error("TMDB request failed", error);

        return res.status(500).json({
          success: false,
          message: "TMDB request failed",
        });
      }
    },
);

exports.tmdbvideoconnection = onRequest(
    {
      secrets: [tmdbApiKey],
      cors: true,
    },
    async (req, res) => {
      try {
        const {movieId, endpoint} = req.body;

        if (!movieId) {
          return res.status(400).json({
            success: false,
            message: "Movie ID is required",
          });
        }

        if (!endpoint) {
          return res.status(400).json({
            success: false,
            message: "TMDB endpoint is required",
          });
        }

        const allowedEndpoints = ["videos"];

        if (!allowedEndpoints.includes(endpoint)) {
          return res.status(400).json({
            success: false,
            message: "Invalid TMDB endpoint",
          });
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/${endpoint}?api_key=${tmdbApiKey.value()}`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
              },
            },
        );

        if (!response.ok) {
          throw new Error(`TMDB request failed with status ${response.status}`);
        }

        const data = await response.json();

        return res.status(200).json({
          success: true,
          data: data,
        });
      } catch (error) {
        logger.error("TMDB video request failed", error);

        return res.status(500).json({
          success: false,
          message: "TMDB video request failed",
        });
      }
    },
);

exports.searchmovieswithai = onRequest(
    {
      secrets: [tmdbApiKey],
      cors: true,
    },
    async (req, res) => {
      try {
        const {movieName} = req.body;

        if (!movieName) {
          return res.status(400).json({
            success: false,
            message: "Movie name is required",
          });
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey.value()}&query=${encodeURIComponent(movieName.trim())}&include_adult=false&language=en-US&page=1`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
              },
            },
        );

        if (!response.ok) {
          const errorText = await response.text();

          throw new Error(
              `TMDB request failed: ${response.status} - ${errorText}`,
          );
        }

        const data = await response.json();

        return res.status(200).json({
          success: true,
          data: data,
        });
      } catch (error) {
        logger.error("Movie search failed", error);

        return res.status(500).json({
          success: false,
          message: "Movie search failed",
        });
      }
    },
);
