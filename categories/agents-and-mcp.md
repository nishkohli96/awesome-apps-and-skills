# 🤖 Agents & MCP

_MCP servers, agent frameworks and plugins, plus agent memory, local model runtimes, LLM gateways and APIs, web data tools, and publishing and hosting tools for agents._

## Agents & Templates

- **[agency-agents](https://github.com/msitarzewski/agency-agents)** <img align="absmiddle" alt="skill" src="https://img.shields.io/badge/skill-d97757?style=flat-square"><br>
  Collection of specialist AI agent definitions, from engineering to marketing, that you install into coding agents like Claude Code and Cursor.<br>
  🏷 `ai-agents` `agent-roster` `prompts` `claude-code`
- **[AgenticSeek](https://github.com/Fosowl/agenticSeek)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Fully local, private alternative to Manus AI: an autonomous agent that browses the web, writes and runs code and plans multi-step tasks on your own hardware with local models.<br>
  🏷 `ai-agents` `local-llm` `web-browsing` `self-hosted` `privacy`
- **[Aider](https://aider.chat/)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  AI pair programming in your terminal. An open-source coding assistant that edits code in your local repo with the LLM of your choice.<br>
  🏷 `coding-agent` `pair-programming` `cli` `open-source`
- **[awesome-llm-apps](https://github.com/shubhamsaboo/awesome-llm-apps)** <img align="absmiddle" alt="starter" src="https://img.shields.io/badge/starter-7d5ba6?style=flat-square"><br>
  Collection of 100+ open-source AI agents, agent skills and RAG apps you can clone and run.<br>
  🏷 `ai-agents` `rag` `llm-apps` `templates`
- **[Hermes Agent](https://github.com/NousResearch/hermes-agent)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Open-source AI agent from Nous Research that creates skills from experience and improves them as it works. Switch between models and providers with one command.<br>
  🏷 `ai-agents` `self-improving` `skills` `open-source`
- **[Langflow](https://www.langflow.org/)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Low-code visual builder for AI agents and RAG applications that you can run yourself, then deploy as APIs.<br>
  🏷 `low-code` `ai-agents` `rag` `workflow-builder` `open-source`
- **[LangGraph](https://github.com/langchain-ai/langgraph)** <img align="absmiddle" alt="library" src="https://img.shields.io/badge/library-0a7ea4?style=flat-square"><br>
  Low-level orchestration framework for building stateful, long-running AI agents, from the LangChain team.<br>
  🏷 `ai-agents` `orchestration` `stateful-agents` `python` `open-source`
- **[OpenClaw](https://openclaw.ai/)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Open-source AI assistant that runs on your machine and works from WhatsApp, Telegram or any chat app.<br>
  🏷 `ai-assistant` `agent` `self-hosted` `chat`
- **[OpenCode](https://opencode.ai/)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Open-source coding agent for the terminal, desktop and IDEs that works with models from many providers.<br>
  🏷 `coding-agent` `terminal` `open-source` `cli`
- **[OpenHands](https://www.openhands.dev/)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Open-source AI coding agent platform that you can start locally, point at any model and use to automate engineering workflows.<br>
  🏷 `coding-agent` `ai-agents` `automation` `open-source`
- **[Paperclip](https://github.com/paperclipai/paperclip)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Open-source app that orchestrates a team of AI agents, with goals, budgets and a dashboard to track work and costs.<br>
  🏷 `agent-orchestration` `ai-agents` `self-hosted` `dashboard`

## Memory & Context

- **[claude-mem](https://github.com/thedotmack/claude-mem)** <img align="absmiddle" alt="plugin" src="https://img.shields.io/badge/plugin-bf3989?style=flat-square"><br>
  Plugin that captures what your coding agent does, compresses it and injects relevant context into future sessions.<br>
  🏷 `ai-memory` `claude-code` `context` `agents`
- **[Headroom](https://github.com/headroomlabs-ai/headroom)** <img align="absmiddle" alt="library" src="https://img.shields.io/badge/library-0a7ea4?style=flat-square"><br>
  Compresses tool outputs, logs, files and RAG chunks before they reach the LLM. Works as a library, proxy or MCP server.<br>
  🏷 `context-compression` `token-optimization` `proxy` `mcp`

## Local Models

- **[colibri](https://github.com/JustVugg/colibri)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Inference engine written in C that runs very large mixture-of-experts open models on hardware you already own, keeping active experts in memory and streaming the rest from disk. Supports CPU, CUDA and Vulkan.<br>
  🏷 `local-llm` `inference` `moe` `c` `open-source`
- **[Jan](https://www.jan.ai/)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Open-source ChatGPT alternative that runs AI models locally on your computer or connects to cloud models like GPT and Claude.<br>
  🏷 `local-llm` `chat` `offline` `open-source` `desktop`
- **[LitServe](https://github.com/Lightning-AI/LitServe)** <img align="absmiddle" alt="library" src="https://img.shields.io/badge/library-0a7ea4?style=flat-square"><br>
  Minimal Python framework for building custom AI inference servers, with full control over batching, streaming, routing and scaling for models, agents and RAG pipelines.<br>
  🏷 `inference` `model-serving` `python` `batching`
- **[Magnitude](https://magnitude.dev/)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Open-source inference engine that tunes itself to your hardware to run open models locally on Mac, Windows and Linux.<br>
  🏷 `inference` `local-llm` `open-models` `self-hosted`<br>
  💰 free
- **[PocketPal AI](https://github.com/a-ghorbani/pocketpal-ai)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Open-source private AI assistant that runs language models entirely on your phone, with chat, voice and tools that work offline and need no account.<br>
  🏷 `local-llm` `mobile` `offline` `privacy` `open-source`

## Model Gateways & APIs

- **[FreeLLMAPI](https://github.com/tashfeenahmed/freellmapi)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Gateway that puts many free LLM provider tiers behind one OpenAI-compatible endpoint, with routing and failover. Personal use only.<br>
  🏷 `llm-gateway` `free-llm` `openai-compatible` `routing`
- **[MiniMax](https://www.minimax.io/)** <img align="absmiddle" alt="website" src="https://img.shields.io/badge/website-218bff?style=flat-square"><br>
  AI lab and platform offering multimodal models for text, video, speech and music, with an API and coding and design agents.<br>
  🏷 `llm` `multimodal` `ai-api` `agents`
- **[OmniRoute](https://github.com/diegosouzapw/OmniRoute)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Free open-source AI gateway: one endpoint for many providers and models, with quota-aware auto-fallback.<br>
  🏷 `ai-gateway` `llm-proxy` `model-routing` `mcp`
- **[OpenRouter](https://openrouter.ai/)** <img align="absmiddle" alt="web-tool" src="https://img.shields.io/badge/web--tool-4f46e5?style=flat-square"><br>
  One API and interface for hundreds of AI models, with price and provider comparison and some free models.<br>
  🏷 `llm-api` `model-router` `ai-models`<br>
  💰 freemium

## Agent Tools & Data

- **[ArtiGram](https://artigram.cafeboon.com)** <img align="absmiddle" alt="mcp-server" src="https://img.shields.io/badge/mcp--server-0969da?style=flat-square"><br>
  Free gallery where people and AI assistants post interactive HTML artifacts, with a remote MCP server so an assistant can publish and update a post from a chat.<br>
  🏷 `mcp` `artifacts` `publishing` `gallery`<br>
  💰 free<br>
  🔗 [mcp](https://artigram.cafeboon.com/mcp)
- **[assistant-ui](https://www.assistant-ui.com/)** <img align="absmiddle" alt="library" src="https://img.shields.io/badge/library-0a7ea4?style=flat-square"> <img align="absmiddle" alt="React" src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB"><br>
  Open-source React components and runtimes for building AI chat interfaces, with streaming, tool calls and persistence in TypeScript.<br>
  🏷 `chat-ui` `ai-agents` `react` `typescript` `open-source`
- **[ATS Jobs MCP](https://github.com/GeminiGeorge22/ats-jobs-mcp)** <img align="absmiddle" alt="mcp-server" src="https://img.shields.io/badge/mcp--server-0969da?style=flat-square"><br>
  Local stdio MCP server that forwards calls to a hosted Apify endpoint (needs your own `APIFY_TOKEN`), for new job postings since any date from Ashby, Greenhouse, Lever and SmartRecruiters job boards.<br>
  🏷 `mcp` `jobs` `recruiting` `data`
- **[camofox-browser](https://github.com/jo-inc/camofox-browser)** <img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square"><br>
  Headless browser server for AI agents, built on Camoufox with fingerprint spoofing as a Puppeteer and Playwright replacement.<br>
  🏷 `headless-browser` `browser-automation` `ai-agents` `scraping`
- **[Crawl4AI](https://github.com/unclecode/crawl4ai)** <img align="absmiddle" alt="library" src="https://img.shields.io/badge/library-0a7ea4?style=flat-square"><br>
  Open-source web crawler and scraper that turns pages into clean Markdown or structured JSON for RAG and AI agents. Run it yourself with Python or Docker, or use the hosted API.<br>
  🏷 `web-scraping` `crawler` `rag` `markdown` `open-source`
- **[CurlShot](https://curlshot.com/)** <img align="absmiddle" alt="mcp-server" src="https://img.shields.io/badge/mcp--server-0969da?style=flat-square"><br>
  Screenshot API with a remote MCP server: renders a URL as PNG, JPEG, WebP, PDF or a scrolling video for agents.<br>
  🏷 `mcp` `screenshots` `api` `web-capture`<br>
  💰 freemium<br>
  🔗 [mcp](https://curlshot.com/api/mcp)
- **[DC Hub](https://github.com/azmartone67/dchub-mcp-server)** <img align="absmiddle" alt="mcp-server" src="https://img.shields.io/badge/mcp--server-0969da?style=flat-square"><br>
  Orchestration layer for data center and energy intelligence. Start with execute_plan for grid power, electricity prices or interconnection queues. Publishes the Data Center Power Index (DCPI) across 300+ markets daily (96 MCP tools). DCHUB_API_KEY is optional.<br>
  🏷 `mcp` `data-centers` `energy` `site-selection`<br>
  🔗 [mcp](https://dchub.cloud/mcp)
- **[deed.page](https://deed.page/)** <img align="absmiddle" alt="mcp-server" src="https://img.shields.io/badge/mcp--server-0969da?style=flat-square"><br>
  Static hosting for AI agents: publish HTML to a live `<slug>.deed.page` URL with one HTTP PUT or a remote MCP call.<br>
  🏷 `mcp` `hosting` `static-sites` `ai-agents`<br>
  💰 freemium<br>
  🔗 [mcp](https://deed.page/mcp)
- **[Etsy Sales MCP](https://github.com/GeminiGeorge22/etsy-sales-mcp)** <img align="absmiddle" alt="mcp-server" src="https://img.shields.io/badge/mcp--server-0969da?style=flat-square"><br>
  Local stdio MCP server that forwards calls to a hosted Apify endpoint (needs your own `APIFY_TOKEN`), for Etsy search results by keyword, marketplace and category, plus daily sales counts and growth for any Etsy shop.<br>
  🏷 `mcp` `etsy` `ecommerce` `data`
- **[Firecrawl](https://www.firecrawl.dev/)** <img align="absmiddle" alt="web-tool" src="https://img.shields.io/badge/web--tool-4f46e5?style=flat-square"><br>
  Web data API that lets AI agents search, scrape, map and crawl the web. The core is open source.<br>
  🏷 `web-scraping` `ai-agents` `api` `crawler`<br>
  💰 freemium
- **[Kilobat CLI](https://github.com/seifip/kilobat-cli)** <img align="absmiddle" alt="mcp-server" src="https://img.shields.io/badge/mcp--server-0969da?style=flat-square"><br>
  Local macOS CLI and stdio MCP server for network diagnostics and keeping the Mac awake during a command.<br>
  🏷 `mcp` `macos` `network-diagnostics` `cli`<br>
  💰 free
- **[PlaceCall](https://github.com/voygr-tech/placecall)** <img align="absmiddle" alt="mcp-server" src="https://img.shields.io/badge/mcp--server-0969da?style=flat-square"><br>
  Lets an AI agent phone US businesses to book, ask questions or get quotes, and returns the call outcome, transcript and recording.<br>
  🏷 `mcp` `phone-calls` `voice-agents` `ai-agents`<br>
  💰 paid<br>
  🔗 [mcp](https://api.voygr.tech/mcp)
- **[Scrapling](https://github.com/D4Vinci/Scrapling)** <img align="absmiddle" alt="library" src="https://img.shields.io/badge/library-0a7ea4?style=flat-square"><br>
  Python web scraping framework for everything from a single request to a full crawl, with stealth fetching and a built-in MCP server.<br>
  🏷 `web-scraping` `crawler` `mcp` `python`<br>
  💰 free
