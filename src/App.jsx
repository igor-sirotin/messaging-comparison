import { useState } from "react";

const apps = [
  {
    name: "Signal",
    category: "centralized",
    tagline: "Gold standard E2EE, centralized servers",
    icon: "🔵",
    protocol: "Signal Protocol (Double Ratchet)",
    architecture: "Centralized",
    encryption: "E2E (Signal Protocol)",
    openSource: "Client: Yes, Server: Yes",
    identifier: "Phone number required",
    metadataProtection: "Minimal — server sees who talks to whom, when, IP addresses",
    pfs: true,
    postCompromise: true,
    quantumResistant: false,
    anonymousSignup: false,
    noPhoneRequired: false,
    selfHostable: false,
    federated: false,
    p2p: false,
    offlineCapable: false,
    groupSize: "1000+",
    voiceVideo: true,
    multiDevice: true,
    platforms: "Android, iOS, Windows, macOS, Linux",
    funding: "Non-profit (Signal Foundation, Brian Acton donation)",
    jurisdiction: "USA (Five Eyes)",
    audited: true,
    userBase: "~40M+ monthly users",
    rateLimiting: "Server-side, closed-source. Behavior-based detection + CAPTCHA challenges. Exact rates unpublished; reports suggest ~10 msgs before limits trigger for new contacts. Spam detection code kept private intentionally.",
    offlineDelivery: "Central servers queue messages. Recipient pulls queued messages on reconnect. Simple, reliable — the server is the store-and-forward node. This is exactly the centralization point.",
    pros: [
      "Best-in-class encryption protocol, widely adopted",
      "Excellent UX, familiar WhatsApp-like interface",
      "Robust voice/video calling",
      "Independent non-profit with no ad/data business model",
      "Protocol used by WhatsApp, Google Messages, etc.",
    ],
    cons: [
      "Requires phone number — no anonymous sign-up",
      "Centralized servers = single point of failure/control",
      "US jurisdiction (Five Eyes alliance)",
      "Doesn't allow third-party clients or federation",
      "Server sees metadata: who talks to whom, when, IP addresses",
      "Account recovery tied to phone number",
    ],
    centralizationPoints: [
      "Single server infrastructure operated by Signal Foundation",
      "Phone number as mandatory identifier",
      "Google/Apple push notification dependency",
      "No federation — walled garden",
    ],
  },
  {
    name: "Matrix / Element",
    category: "federated",
    tagline: "Federated protocol, run your own server",
    icon: "🟢",
    protocol: "Matrix (Olm/Megolm, Double Ratchet variant)",
    architecture: "Federated",
    encryption: "E2E (Megolm) — opt-in for DMs, default for some clients",
    openSource: "Client: Yes, Server: Yes, Protocol: Yes",
    identifier: "Matrix ID (@user:server.org)",
    metadataProtection: "Weak — homeservers see metadata, rooms replicate across servers",
    pfs: true,
    postCompromise: true,
    quantumResistant: false,
    anonymousSignup: true,
    noPhoneRequired: true,
    selfHostable: true,
    federated: true,
    p2p: false,
    offlineCapable: false,
    groupSize: "Unlimited (thousands)",
    voiceVideo: true,
    multiDevice: true,
    platforms: "Android, iOS, Windows, macOS, Linux, Web",
    funding: "Element (VC-backed company) + Matrix.org Foundation (non-profit)",
    jurisdiction: "UK (Five Eyes)",
    audited: true,
    userBase: "~100M+ accounts across federation",
    rateLimiting: "Server-configurable. Synapse defaults: 0.2 msg/sec sustained, burst of 10. Admins can tune per-user, per-room, per-IP. Covers messages, registrations, joins, invites. No protocol-level enforcement — each homeserver sets its own rules.",
    offlineDelivery: "Recipient\'s homeserver stores messages in the room\'s event DAG. On reconnect, client syncs via /sync. Room replication across all participating homeservers means the message exists on multiple servers — even if sender\'s homeserver dies. Very robust, but messages persist on multiple servers (bad for metadata).",
    pros: [
      "True federation — choose or run your own homeserver",
      "Rich ecosystem: bridges to Slack, Discord, IRC, Telegram, etc.",
      "Excellent for organizations & communities (Spaces, threads)",
      "Fully open protocol — anyone can build clients/servers",
      "Used by governments (France, Germany) and NATO",
      "Room replication provides redundancy",
    ],
    cons: [
      "Metadata leaks heavily — homeservers see everything",
      "E2EE historically flaky, key verification UX is poor",
      "Synapse server is resource-hungry and complex to self-host",
      "Federation creates a large attack surface",
      "Most users default to matrix.org = de facto centralization",
      "Slow protocol evolution, complex spec",
    ],
    centralizationPoints: [
      "matrix.org homeserver hosts majority of users",
      "Element company dominates client/server development",
      "Matrix.org Foundation controls the spec",
      "Key management/cross-signing UX pushes users to defaults",
    ],
  },
  {
    name: "Session",
    category: "decentralized",
    tagline: "Onion-routed, no phone number, blockchain nodes",
    icon: "🟣",
    protocol: "Session Protocol (Libsodium-based)",
    architecture: "Decentralized (blockchain node network)",
    encryption: "E2E (Session Protocol)",
    openSource: "Client: Yes, Node: Yes",
    identifier: "Random 66-char Session ID",
    metadataProtection: "Strong — onion routing hides IP, no phone/email required",
    pfs: false,
    postCompromise: false,
    quantumResistant: false,
    anonymousSignup: true,
    noPhoneRequired: true,
    selfHostable: false,
    federated: false,
    p2p: false,
    offlineCapable: false,
    groupSize: "100 (closed groups)",
    voiceVideo: true,
    multiDevice: true,
    platforms: "Android, iOS, Windows, macOS, Linux",
    funding: "Session Technology Foundation + OXEN/SESSION token",
    jurisdiction: "Switzerland (moved from Australia in 2024)",
    audited: true,
    userBase: "~1M+ users",
    rateLimiting: "Service node level. Swarm nodes may reject excessive requests but no formal protocol-level rate limiting. Closed groups limited to ~100 members which implicitly caps message fan-out. No published rate numbers.",
    offlineDelivery: "Swarm architecture. Each Session ID is assigned to a swarm of 5–9 Service Nodes. Messages deposited via onion routing into recipient\'s swarm, stored redundantly for up to 14 days. Recipient polls swarm on reconnect, messages deleted after retrieval. Nodes act as temporary store-and-forward relays.",
    pros: [
      "No phone number or email required — truly anonymous sign-up",
      "Onion routing hides IP addresses from all participants",
      "Decentralized node network (~2000+ nodes) with no central server",
      "Moved to Switzerland to escape Five Eyes jurisdiction",
      "Simple UX despite decentralized architecture",
      "Account restoration with seed phrase",
    ],
    cons: [
      "No Perfect Forward Secrecy (PFS) — major cryptographic weakness",
      "No post-compromise security (break-in recovery)",
      "Dropped Signal Protocol for weaker custom protocol",
      "Relies on blockchain staking (OXEN/SESSION token) for node network",
      "File server is still centralized (though accessed via onion requests)",
      "Small user base, group size limited to ~100",
      "Voice/video call quality reported as poor",
    ],
    centralizationPoints: [
      "Centralized file/attachment server (accessed via onion routing)",
      "Push notification service is centralized",
      "SESSION token economics influence node network",
      "Session Technology Foundation controls development",
    ],
  },
  {
    name: "SimpleX Chat",
    category: "decentralized",
    tagline: "No user identifiers at all — not even random ones",
    icon: "⚫",
    protocol: "SimpleX Messaging Protocol (SMP) + Double Ratchet",
    architecture: "Decentralized (relay servers, no global identity)",
    encryption: "E2E (Double Ratchet + post-quantum hybrid)",
    openSource: "Client: Yes, Server: Yes, Protocol: Yes",
    identifier: "None — uses per-connection queue addresses",
    metadataProtection: "Very strong — no user IDs, no contact graph visible to servers",
    pfs: true,
    postCompromise: true,
    quantumResistant: true,
    anonymousSignup: true,
    noPhoneRequired: true,
    selfHostable: true,
    federated: false,
    p2p: false,
    offlineCapable: false,
    groupSize: "~Thousands (via decentralized groups)",
    voiceVideo: true,
    multiDevice: true,
    platforms: "Android, iOS, Windows, macOS, Linux, Terminal CLI",
    funding: "Donations + VC (Jack Dorsey, Asymmetric) — no token",
    jurisdiction: "UK (company), open protocol",
    audited: true,
    userBase: "~Hundreds of thousands",
    rateLimiting: "SMP relay level. Relays can enforce per-connection queue rate limits. No published default rates. Self-hosted relays = your own rules. No protocol-level spam protection beyond queue-based isolation (each contact uses separate queue).",
    offlineDelivery: "SMP relay servers hold messages in per-connection queues. Relay chosen by recipient (not sender) stores message until retrieval, then deletes. Relay knows queue ID only, not sender identity. Recipient can self-host relay or use defaults.",
    pros: [
      "No user identifiers whatsoever — revolutionary privacy model",
      "Double Ratchet with post-quantum hybrid encryption",
      "Servers cannot see who talks to whom (no contact graph)",
      "Self-hostable relay servers, users choose their servers",
      "Content padding conceals message size",
      "Tor-compatible for additional anonymity",
      "Active development with regular security audits (Trail of Bits)",
      "No blockchain, no token — funded by donations and VC",
    ],
    cons: [
      "Adding contacts requires out-of-band link/QR exchange",
      "Most users use default SimpleX servers = practical centralization",
      "UK jurisdiction raises concerns (Online Safety Act debates)",
      "Smaller community, fewer network effects",
      "Video call quality can be buggy",
      "Complex architecture harder to audit holistically",
      "Group management can have consistency issues in decentralized state",
    ],
    centralizationPoints: [
      "Default relay servers hosted by SimpleX Chat Ltd",
      "SimpleX Chat Ltd (UK) controls development direction",
      "XFTP file transfer servers",
      "VC funding (Jack Dorsey) may influence future direction",
    ],
  },
  {
    name: "Briar",
    category: "p2p",
    tagline: "True P2P: Tor, Bluetooth, Wi-Fi — no servers at all",
    icon: "🟤",
    protocol: "Bramble Transport Protocol + Bramble Sync Protocol",
    architecture: "Pure P2P (Tor, Bluetooth, Wi-Fi direct)",
    encryption: "E2E (custom protocol over Tor)",
    openSource: "Client: Yes, Protocol: Yes",
    identifier: "Briar identity key (exchanged in person or via link)",
    metadataProtection: "Excellent — no servers, messages stay on device",
    pfs: true,
    postCompromise: true,
    quantumResistant: false,
    anonymousSignup: true,
    noPhoneRequired: true,
    selfHostable: false,
    federated: false,
    p2p: true,
    offlineCapable: true,
    groupSize: "Small (designed for small groups)",
    voiceVideo: false,
    multiDevice: false,
    platforms: "Android only (desktop in beta)",
    funding: "Grants (Open Technology Fund, etc.) + donations",
    jurisdiction: "Open-source project (international contributors)",
    audited: true,
    userBase: "~50K-100K",
    rateLimiting: "None. Direct P2P connections only — no intermediary to enforce limits. Bluetooth/Wi-Fi range and Tor circuit limits provide implicit throughput caps. No spam protection mechanism.",
    offlineDelivery: "Original design requires both online simultaneously. Added mailbox feature: a trusted contact\'s always-on device (e.g., Raspberry Pi) receives messages on your behalf. Honest acknowledgment that store-and-forward requires something online — but major UX limitation.",
    pros: [
      "Zero servers — true peer-to-peer architecture",
      "Works without internet via Bluetooth/Wi-Fi mesh",
      "Messages stored only on user devices, never in cloud",
      "Routes over Tor when internet is available",
      "Perfect for activists, journalists in hostile environments",
      "No metadata for anyone to collect",
      "Independent security audit completed",
    ],
    cons: [
      "Android only (Linux desktop in beta, no iOS)",
      "No voice or video calls",
      "Both users must be online simultaneously for delivery (or in BT range)",
      "Text-only messages (no files beyond images in forums)",
      "Battery-intensive due to Tor and mesh networking",
      "Very small user base and limited functionality",
      "Contact exchange requires in-person meeting or link sharing",
      "No multi-device support",
    ],
    centralizationPoints: [
      "Tor network dependency (Tor has directory authorities)",
      "Small development team with limited resources",
      "Google Play Store distribution (F-Droid available as alternative)",
    ],
  },
  {
    name: "Status",
    category: "decentralized",
    tagline: "Waku protocol + crypto wallet + Web3 browser",
    icon: "🔷",
    protocol: "Waku v2 (libp2p pub/sub) + Double Ratchet",
    architecture: "Decentralized (P2P via Waku network)",
    encryption: "E2E (Double Ratchet over Waku)",
    openSource: "Client: Yes, Protocol: Yes (Waku)",
    identifier: "Ethereum keypair (chat key)",
    metadataProtection: "Moderate-to-good — P2P pub/sub, no central server stores messages",
    pfs: true,
    postCompromise: true,
    quantumResistant: false,
    anonymousSignup: true,
    noPhoneRequired: true,
    selfHostable: false,
    federated: false,
    p2p: true,
    offlineCapable: false,
    groupSize: "Communities: thousands",
    voiceVideo: false,
    multiDevice: true,
    platforms: "Android, iOS, Windows, macOS, Linux",
    funding: "IFT (Institute of Free Technology) / Status Network + SNT token",
    jurisdiction: "Switzerland (Logos/IFT)",
    audited: true,
    userBase: "~100K-500K",
    rateLimiting: "RLN (Rate Limiting Nullifier) — privacy-preserving ZK proof-based. Network default: 100 msgs per 10-min epoch (configurable 20–600). Max message size: 150 KB. Membership registered on-chain (Sepolia testnet). Violators get disconnected. Global network cap: ~266 msg/sec (~6 Mbps).",
    offlineDelivery: "Waku Store protocol. Messages propagate through relay network (libp2p GossipSub), Store nodes persist messages. Recipient queries Store nodes on reconnect. SDS (Scalable Data Sync) adds reliability layer — detects gaps, backfills from Store nodes. Store node incentivization still in development (ZK ticket-based payments PoC).",
    pros: [
      "Built on Waku — communication layer of the Logos tech stack",
      "Part of Ethereum's original 'Holy Trinity' vision (compute, storage, communication)",
      "Integrated crypto wallet and Web3 browser",
      "Communities feature for large decentralized groups",
      "RLN (Rate Limiting Nullifier) for privacy-preserving DoS protection",
      "No phone number required, Ethereum key-based identity",
      "Active protocol research (mixnet, SDS reliability, incentivization)",
      "Recognized by Vitalik Buterin as continuation of Whisper",
    ],
    cons: [
      "Waku protocol still maturing — message reliability issues being worked on",
      "App can be resource-heavy and battery-intensive",
      "Smaller user base compared to Signal/Matrix",
      "Complexity of crypto/Web3 features may alienate non-crypto users",
      "SNT token economics add financial complexity to ecosystem",
      "No voice/video calls yet",
      "Incentivization model for node operators still in development",
    ],
    centralizationPoints: [
      "IFT/Status Network funds and directs core development",
      "Default Waku nodes (though anyone can run nodes)",
      "Infura and similar services for Ethereum RPC",
      "App store distribution (Google Play, Apple App Store)",
    ],
  },
  {
    name: "Logos Chat (Chat SDK)",
    category: "prerelease",
    tagline: "Noise + Double Ratchet + de-MLS over Waku — SDK for developers",
    icon: "🔶",
    protocol: "Noise (session) + Double Ratchet (1:1) + de-MLS (groups) over Waku v2",
    architecture: "Decentralized (P2P via Waku/Logos Messaging network)",
    encryption: "E2E: Noise handshakes → Double Ratchet (1:1), de-MLS (groups) — in development",
    openSource: "SDK: Yes (Nim), Protocol: Yes, Nodes: Yes (nwaku/js-waku)",
    identifier: "Crypto keypair + Ratcheting Private Identifiers (draft)",
    metadataProtection: "Strong (design target) — pub/sub routing, no central server, mixnet in testing",
    pfs: true,
    postCompromise: true,
    quantumResistant: false,
    anonymousSignup: true,
    noPhoneRequired: true,
    selfHostable: true,
    federated: false,
    p2p: true,
    offlineCapable: false,
    groupSize: "Scalable via de-MLS (log N key operations)",
    voiceVideo: false,
    multiDevice: true,
    platforms: "Nim (native), JS/TS (browser via js-waku), multi-platform target",
    funding: "IFT / Logos Collective (no token dependency for SDK)",
    jurisdiction: "Switzerland (IFT)",
    audited: false,
    userBase: "Pre-release — developer/dogfooding only",
    rateLimiting: "RLN (same as Waku) — ZK proof-based, privacy-preserving. SDK includes rate limit manager backed by SQLite. Configurable per-membership limits. Integrated into Reliable Channel API layer. Designed to be transparent to app developers.",
    offlineDelivery: "Same as Status/Waku: Waku Store protocol + SDS reliability layer. The Chat SDK integrates SDS at the Reliable Channel API level, handling gap detection and backfill transparently. Store node economics still being designed.",
    maturity: "MVP in development",
    pros: [
      "Cleanest layered architecture: Waku transport → Reliable Channel → Chat SDK → App",
      "de-MLS for groups: MLS scalability without centralized Delivery Service (Vac research)",
      "Noise + Double Ratchet = proven crypto foundations, not reinventing the wheel",
      "RLN for privacy-preserving DoS protection — unique in the messaging space",
      "Designed for third-party developers from day one, not just one app's internal protocol",
      "Mixnet integration (libp2p mix) already being tested for traffic analysis resistance",
      "Ratcheting Private Identifiers — rotating identity markers to prevent long-term correlation",
      "SDS (Scalable Data Sync) for end-to-end message reliability with gap detection",
      "WebRTC signalling over Waku being explored for low-latency browser P2P",
      "Part of broader Logos stack (Nomos consensus + Codex storage + Waku messaging)",
    ],
    cons: [
      "Does not ship yet — MVP milestone is open, crypto being scaffolded",
      "de-MLS Steward role is semi-centralized for group initialization",
      "Nim ecosystem is small — fewer auditors, fewer contributors, harder hiring",
      "Extreme complexity: Waku + SDS + RLN + Noise + DR + de-MLS + segmentation + sharding",
      "No independent security audit of the Chat SDK crypto layer yet",
      "Key backup/recovery design still being discussed (Nov 2025)",
      "Development priorities may get pulled toward Status's specific needs",
      "No voice/video calls",
      "Store node incentivization still PoC (ZK ticket-based payments)",
    ],
    centralizationPoints: [
      "IFT/Logos controls development direction and funding",
      "Default Waku fleet nodes handle most traffic in practice",
      "Store node incentivization not yet live — volunteers/fleet only",
      "de-MLS Steward role for group membership management",
      "RLN membership on Linea Sepolia testnet — chain dependency",
    ],
  },
  {
    name: "XMPP (Conversations, etc.)",
    category: "federated",
    tagline: "The OG federated protocol — 25+ years old",
    icon: "🟠",
    protocol: "XMPP + OMEMO (Double Ratchet variant)",
    architecture: "Federated",
    encryption: "E2E via OMEMO extension (opt-in)",
    openSource: "Clients: Many, Servers: Many, Protocol: Yes (IETF standard)",
    identifier: "JID (user@server.tld)",
    metadataProtection: "Weak — server admin sees metadata, federation leaks routing info",
    pfs: true,
    postCompromise: true,
    quantumResistant: false,
    anonymousSignup: true,
    noPhoneRequired: true,
    selfHostable: true,
    federated: true,
    p2p: false,
    offlineCapable: false,
    groupSize: "Varies by server",
    voiceVideo: true,
    multiDevice: true,
    platforms: "Android, iOS, Windows, macOS, Linux, Web (many clients)",
    funding: "Volunteer-driven + XMPP Standards Foundation (non-profit)",
    jurisdiction: "Decentralized (no single entity)",
    audited: false,
    userBase: "Millions (fragmented across servers)",
    rateLimiting: "Server-configurable. Varies by implementation — ejabberd and Prosody both support rate limiting modules. No protocol-level standard. Typically configured per-connection or per-JID by server admin. No default rates in the XMPP spec itself.",
    offlineDelivery: "Server stores offline messages (XEP-0160), delivers on reconnect. MAM (Message Archive Management, XEP-0313) provides persistent server-side history. Straightforward server-side storage — your server admin holds your messages.",
    pros: [
      "IETF standard — longest-running federated messaging protocol",
      "Massive client/server ecosystem, many choices",
      "True federation — full interoperability between servers",
      "OMEMO provides solid E2E encryption",
      "Easy to self-host (ejabberd, Prosody are lightweight)",
      "No single company controls the protocol",
      "Extremely extensible via XEPs (XMPP Extension Protocols)",
    ],
    cons: [
      "Fragmented ecosystem — inconsistent client quality and feature support",
      "OMEMO not enabled by default, multi-device key management is painful",
      "UX generally poor compared to modern messengers",
      "Group chat support (MUC) is dated and clunky",
      "Metadata visible to server admins",
      "Voice/video support inconsistent across clients",
      "Declining user base and developer momentum",
    ],
    centralizationPoints: [
      "Large public servers (like jabber.org) host many users",
      "XMPP Standards Foundation controls XEP process",
      "Google dropped XMPP federation (Talk/Hangouts), fragmenting the network",
      "Server admin has full metadata access",
    ],
  },
  {
    name: "Tox",
    category: "p2p",
    tagline: "Serverless P2P with DHT — zero infrastructure",
    icon: "🟡",
    protocol: "Tox protocol (NaCl encryption + DHT)",
    architecture: "Pure P2P (DHT-based)",
    encryption: "E2E (NaCl/libsodium)",
    openSource: "Client: Yes (multiple), Protocol: Yes",
    identifier: "Tox ID (76-char hex string)",
    metadataProtection: "Moderate — DHT exposes IP addresses to peers",
    pfs: false,
    postCompromise: false,
    quantumResistant: false,
    anonymousSignup: true,
    noPhoneRequired: true,
    selfHostable: false,
    federated: false,
    p2p: true,
    offlineCapable: false,
    groupSize: "~512",
    voiceVideo: true,
    multiDevice: false,
    platforms: "Android, iOS, Windows, macOS, Linux",
    funding: "Community-driven, donations",
    jurisdiction: "Open-source project (no legal entity)",
    audited: false,
    userBase: "~10K-50K active",
    rateLimiting: "None formal. DHT protocol has implicit bandwidth limits. No spam protection mechanism at protocol level. Accepting a friend request is the only gate. Once connected, no rate enforcement.",
    offlineDelivery: "No solution. Both peers must be online simultaneously. No store-and-forward in protocol. Client retries when it detects peer\'s DHT status changes to online. Worst case for offline delivery among all compared apps.",
    pros: [
      "Completely serverless — no infrastructure to compromise",
      "No sign-up, no phone, no email — instant start",
      "Built-in voice and video calls (P2P)",
      "Multiple client implementations (qTox, Toxygen, etc.)",
      "Strong encryption (NaCl/libsodium)",
    ],
    cons: [
      "No Perfect Forward Secrecy",
      "IP addresses potentially exposed via DHT",
      "Both peers must be online for message delivery",
      "Susceptible to Sybil attacks via DHT",
      "Development has slowed significantly",
      "No multi-device support",
      "UX is rough and inconsistent across clients",
      "Tiny user base",
    ],
    centralizationPoints: [
      "DHT bootstrap nodes are semi-centralized entry points",
      "Development largely stalled — bus factor risk",
      "No formal organization or sustained funding",
    ],
  },
  {
    name: "DarkFi (DarkIRC)",
    category: "p2p",
    tagline: "Fully anonymous P2P IRC — unlinkable messages, ZK-native",
    icon: "⬛",
    protocol: "Custom DAG-based P2P protocol + Signal-like encryption",
    architecture: "Pure P2P (DAG-based event graph, no servers)",
    encryption: "E2E: Signal-like algorithms for DMs, shared-secret symmetric for channels",
    openSource: "Everything: Yes (GNU AGPL, Rust, Codeberg)",
    identifier: "None — no persistent identity, nick changeable at will",
    metadataProtection: "Maximum — messages are unlinkable, no persistent identity, Tor/Nym opt-in",
    pfs: false,
    postCompromise: false,
    quantumResistant: false,
    anonymousSignup: true,
    noPhoneRequired: true,
    selfHostable: true,
    federated: false,
    p2p: true,
    offlineCapable: true,
    groupSize: "Unlimited (public channels via DAG)",
    voiceVideo: false,
    multiDevice: false,
    platforms: "Android, Linux, Windows, macOS (custom UI, single codebase)",
    funding: "Community-driven, crypto-anarchist collective",
    jurisdiction: "No legal entity — anonymous developer collective",
    audited: false,
    userBase: "Small — alpha stage, dev community + early adopters",
    rateLimiting: "None formal. DAG-based architecture provides some implicit limits (event graph propagation). No protocol-level spam protection. P2P network topology limits throughput naturally. Planned but not implemented.",
    offlineDelivery: "DAG-based event graph provides ~1 day message permanence. When a node joins the network, it syncs the DAG and retrieves missed messages. No infinite storage — messages eventually expire. Better than pure P2P (Tox) but not indefinite.",
    maturity: "Alpha (Jan 2025 release)",
    pros: [
      "Strongest anonymity claim in the space — messages are fully unlinkable between each other",
      "No persistent identity at all — no accounts, no keys tied to you, change nick freely",
      "DAG-based architecture provides eventual consistency and message permanence (~1 day)",
      "Tor and Nym integration for network-level anonymity",
      "Part of broader DarkFi L1 blockchain with ZK smart contracts, DAO, wallet",
      "Custom cross-platform UI — single codebase for all platforms including mobile",
      "GNU AGPL — strongest copyleft, fully open source on Codeberg (not GitHub)",
      "Kyber post-quantum KEM implemented as standalone crate (future DM encryption)",
      "Pluggable transports architecture — clearnet, Tor, Nym",
      "Super-app vision: chat is first add-on, with DAO/wallet/filesharing planned",
    ],
    cons: [
      "Alpha software — expect bugs, sync can be slow",
      "Private DMs and secret channels still being developed (next milestone)",
      "No PFS or post-compromise security in current channel encryption (shared secret)",
      "Very small network — handful of active users currently",
      "IRC-style UX — channels only, no modern chat features (reactions, threads, etc.)",
      "No voice/video calls",
      "No multi-device support",
      "Requires running a local daemon (darkirc) — not plug-and-play for non-technical users",
      "Crypto-anarchist framing may limit mainstream adoption",
      "No independent security audit",
    ],
    centralizationPoints: [
      "Seed nodes for P2P bootstrapping (standard for any P2P network)",
      "Small core developer team led by Amir Taaki",
      "No formal organization — bus factor risk similar to Tox",
      "Testnet blockchain (DarkFi L1) not yet at mainnet",
    ],
  },
  {
    name: "XMTP",
    category: "web3",
    tagline: "Web3-native messaging with quantum-resistant E2EE",
    icon: "🔴",
    protocol: "XMTP (MLS-based, quantum-resistant hybrid encryption)",
    architecture: "Decentralized (distributed node network)",
    encryption: "E2E (MLS with quantum-resistant hybrid)",
    openSource: "Client SDKs: Yes, Nodes: Yes, Contracts: Yes",
    identifier: "Any DID or wallet address",
    metadataProtection: "Moderate — nodes route messages, payments flow to operators",
    pfs: true,
    postCompromise: true,
    quantumResistant: true,
    anonymousSignup: true,
    noPhoneRequired: true,
    selfHostable: true,
    federated: false,
    p2p: false,
    offlineCapable: false,
    groupSize: "Group chats supported",
    voiceVideo: false,
    multiDevice: true,
    platforms: "SDK-based (React, React Native, Kotlin, Swift, JS)",
    funding: "VC-funded (a]16z, etc.)",
    jurisdiction: "USA",
    audited: true,
    userBase: "Developer ecosystem (used by Coinbase, Converse, etc.)",
    rateLimiting: "Node-level enforcement. Details not fully published. MLS group operations have inherent overhead that limits throughput. Node operators can set policies. No ZK-based or protocol-level spam protection.",
    offlineDelivery: "Node operators store encrypted messages. Recipient retrieves from network on reconnect. Node operators paid (~$5/100K messages) — economic incentive for storage built into protocol from the start.",
    pros: [
      "Quantum-resistant encryption (MLS, audited by same firm as Signal)",
      "Identity-agnostic: wallets, passkeys, social accounts",
      "Native digital currency integration in conversations",
      "No API keys or kill switches — permissionless protocol",
      "Used by major Web3 companies (Coinbase Wallet, etc.)",
      "Node operators paid directly (~$5/100K messages)",
    ],
    cons: [
      "Primarily SDK/developer tool, not a consumer app",
      "Web3-native = requires crypto literacy for full use",
      "VC-funded (a16z) — potential conflict with decentralization ethos",
      "Still early-stage, ecosystem maturing",
      "No voice/video",
      "US jurisdiction",
    ],
    centralizationPoints: [
      "VC funding from a16z may influence direction",
      "XMTP Labs controls core development",
      "Node network still growing — early distribution may be concentrated",
      "US jurisdiction for core team",
    ],
  },
  {
    name: "Delta Chat",
    category: "federated",
    tagline: "Chat over email — uses existing email servers",
    icon: "💬",
    protocol: "Autocrypt (OpenPGP-based) over IMAP/SMTP",
    architecture: "Federated (email infrastructure)",
    encryption: "E2E (Autocrypt/OpenPGP, opt-in with verified groups)",
    openSource: "Client: Yes (Rust core + multiple frontends)",
    identifier: "Email address",
    metadataProtection: "Weak — email servers see all metadata, subject lines, etc.",
    pfs: false,
    postCompromise: false,
    quantumResistant: false,
    anonymousSignup: true,
    noPhoneRequired: true,
    selfHostable: true,
    federated: true,
    p2p: false,
    offlineCapable: true,
    groupSize: "Limited by email infrastructure",
    voiceVideo: false,
    multiDevice: true,
    platforms: "Android, iOS, Windows, macOS, Linux",
    funding: "Grants (Open Technology Fund, NLnet, etc.) + donations",
    jurisdiction: "Germany/EU (non-profit)",
    audited: true,
    userBase: "~100K+",
    rateLimiting: "Email server rate limits apply. Gmail: ~500 msgs/day, most SMTP servers have per-hour/per-day caps. Autocrypt key exchange adds overhead. Effectively inherits decades of email anti-spam infrastructure (SPF, DKIM, DMARC, greylisting).",
    offlineDelivery: "Email infrastructure. Message sits in recipient\'s IMAP inbox on their email server. 40+ years of battle-tested store-and-forward. Robust and reliable, but email server sees everything.",
    pros: [
      "Works with ANY existing email account — zero new infrastructure",
      "Recipient doesn't need Delta Chat installed (gets regular email)",
      "Massive existing federation (all email servers in the world)",
      "Familiar chat UX on top of proven email infrastructure",
      "Guaranteed delivery and offline support (email stores messages)",
      "Webxdc apps — run mini-apps inside chats",
    ],
    cons: [
      "Email metadata is highly exposed (servers, providers, governments)",
      "OpenPGP lacks PFS and post-compromise security",
      "Autocrypt key exchange can be MITMed without verification",
      "Delivery can be slow (email polling intervals)",
      "Spam filters may interfere with messages",
      "No voice/video calls",
      "Email providers can read unencrypted messages and metadata",
    ],
    centralizationPoints: [
      "Relies on user's email provider (Gmail, Outlook, etc.)",
      "Major email providers (Google, Microsoft) dominate infrastructure",
      "DNS system for email routing",
      "Email provider can block or filter messages",
    ],
  },
];

const categories = {
  centralized: { label: "Centralized", color: "#ef4444", desc: "Single org controls servers" },
  federated: { label: "Federated", color: "#f59e0b", desc: "Choose/run your own server" },
  decentralized: { label: "Decentralized", color: "#10b981", desc: "Distributed node network" },
  p2p: { label: "Peer-to-Peer", color: "#6366f1", desc: "Direct device-to-device" },
  web3: { label: "Web3 Native", color: "#ec4899", desc: "Blockchain-integrated messaging" },
  prerelease: { label: "Pre-Release", color: "#f97316", desc: "In active development — not yet shipped" },
};

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5L6.5 12L13 4" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4L12 12M12 4L4 12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const PartialIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

function BoolCell({ value }) {
  if (value === true) return <CheckIcon />;
  if (value === false) return <XIcon />;
  return <PartialIcon />;
}

function AppCard({ app, onSelect }) {
  const cat = categories[app.category];
  return (
    <div
      onClick={() => onSelect(app)}
      style={{
        background: "#1a1a2e",
        border: "1px solid #2a2a4a",
        borderRadius: "12px",
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = cat.color;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 30px ${cat.color}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#2a2a4a";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <span style={{ fontSize: "24px" }}>{app.icon}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "18px", color: "#e0e0ff" }}>{app.name}</span>
      </div>
      <div style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        background: `${cat.color}20`,
        color: cat.color,
        border: `1px solid ${cat.color}40`,
        marginBottom: "10px",
      }}>
        {cat.label}
      </div>
      <p style={{ color: "#8888aa", fontSize: "13px", lineHeight: 1.5, margin: 0 }}>{app.tagline}</p>
      {app.maturity && (
        <div style={{
          marginTop: "8px", padding: "4px 10px", borderRadius: "6px",
          background: "#f9731615", border: "1px dashed #f9731650",
          fontSize: "11px", color: "#f97316", fontFamily: "'JetBrains Mono', monospace",
          display: "inline-block",
        }}>
          ⚙ {app.maturity}
        </div>
      )}
      <div style={{ marginTop: "14px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {app.pfs && <MiniTag label="PFS" color="#10b981" />}
        {app.quantumResistant && <MiniTag label="PQ" color="#6366f1" />}
        {app.noPhoneRequired && <MiniTag label="No Phone" color="#f59e0b" />}
        {app.selfHostable && <MiniTag label="Self-Host" color="#ec4899" />}
        {app.p2p && <MiniTag label="P2P" color="#06b6d4" />}
        {app.offlineCapable && <MiniTag label="Offline" color="#84cc16" />}
      </div>
    </div>
  );
}

function MiniTag({ label, color }) {
  return (
    <span style={{
      fontSize: "10px",
      fontWeight: 600,
      padding: "2px 7px",
      borderRadius: "4px",
      background: `${color}18`,
      color: color,
      border: `1px solid ${color}30`,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {label}
    </span>
  );
}

function DetailModal({ app, onClose }) {
  const cat = categories[app.category];
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(8px)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "40px 20px",
      overflowY: "auto",
    }} onClick={onClose}>
      <div style={{
        background: "#12122a",
        border: `1px solid ${cat.color}40`,
        borderRadius: "16px",
        maxWidth: "800px",
        width: "100%",
        padding: "32px",
        position: "relative",
      }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: "absolute", top: "16px", right: "16px",
          background: "none", border: "none", color: "#666", fontSize: "24px", cursor: "pointer",
        }}>×</button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
          <span style={{ fontSize: "32px" }}>{app.icon}</span>
          <h2 style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", color: "#e0e0ff", fontSize: "26px" }}>{app.name}</h2>
        </div>
        <div style={{
          display: "inline-block", padding: "3px 12px", borderRadius: "20px", fontSize: "11px",
          fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase",
          background: `${cat.color}20`, color: cat.color, border: `1px solid ${cat.color}40`,
          marginBottom: "20px",
        }}>{cat.label} — {cat.desc}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          {[
            ["Protocol", app.protocol],
            ["Architecture", app.architecture],
            ["Encryption", app.encryption],
            ["Open Source", app.openSource],
            ["Identifier", app.identifier],
            ["Platforms", app.platforms],
            ["Group Size", app.groupSize],
            ["Jurisdiction", app.jurisdiction],
            ["Funding", app.funding],
            ["User Base", app.userBase],
            ...(app.maturity ? [["Maturity", app.maturity]] : []),
          ].map(([k, v]) => (
            <div key={k} style={{ background: "#1a1a35", borderRadius: "8px", padding: "10px 14px" }}>
              <div style={{ color: "#6666aa", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{k}</div>
              <div style={{ color: "#c0c0dd", fontSize: "13px", lineHeight: 1.4 }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "8px", marginBottom: "24px" }}>
          {[
            ["Perfect Forward Secrecy", app.pfs],
            ["Post-Compromise Security", app.postCompromise],
            ["Quantum Resistant", app.quantumResistant],
            ["Anonymous Sign-up", app.anonymousSignup],
            ["No Phone Required", app.noPhoneRequired],
            ["Self-Hostable", app.selfHostable],
            ["Federated", app.federated],
            ["Peer-to-Peer", app.p2p],
            ["Offline Capable", app.offlineCapable],
            ["Voice/Video", app.voiceVideo],
            ["Multi-Device", app.multiDevice],
            ["Audited", app.audited],
          ].map(([label, val]) => (
            <div key={label} style={{
              background: "#1a1a35", borderRadius: "8px", padding: "8px 10px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <BoolCell value={val} />
              <span style={{ fontSize: "11px", color: "#9999bb" }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#10b981", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", marginBottom: "10px" }}>✦ STRENGTHS</h3>
          {app.pros.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "flex-start" }}>
              <span style={{ color: "#10b981", flexShrink: 0, marginTop: "2px" }}>▸</span>
              <span style={{ color: "#b0b0cc", fontSize: "13px", lineHeight: 1.5 }}>{p}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#ef4444", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", marginBottom: "10px" }}>✦ WEAKNESSES</h3>
          {app.cons.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "flex-start" }}>
              <span style={{ color: "#ef4444", flexShrink: 0, marginTop: "2px" }}>▸</span>
              <span style={{ color: "#b0b0cc", fontSize: "13px", lineHeight: 1.5 }}>{c}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ color: "#f59e0b", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", marginBottom: "10px" }}>✦ CENTRALIZATION POINTS</h3>
          {app.centralizationPoints.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "flex-start" }}>
              <span style={{ color: "#f59e0b", flexShrink: 0, marginTop: "2px" }}>⚠</span>
              <span style={{ color: "#b0b0cc", fontSize: "13px", lineHeight: 1.5 }}>{c}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "20px", padding: "12px 16px", background: "#1a1a35", borderRadius: "8px" }}>
          <div style={{ color: "#6666aa", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Metadata Protection</div>
          <div style={{ color: "#c0c0dd", fontSize: "13px", lineHeight: 1.5 }}>{app.metadataProtection}</div>
        </div>

        {app.rateLimiting && (
          <div style={{ marginTop: "10px", padding: "12px 16px", background: "#1a1a35", borderRadius: "8px" }}>
            <div style={{ color: "#6666aa", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Rate Limiting / Spam Protection</div>
            <div style={{ color: "#c0c0dd", fontSize: "13px", lineHeight: 1.5 }}>{app.rateLimiting}</div>
          </div>
        )}

        {app.offlineDelivery && (
          <div style={{ marginTop: "10px", padding: "12px 16px", background: "#1a1a35", borderRadius: "8px" }}>
            <div style={{ color: "#6666aa", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Offline Message Delivery</div>
            <div style={{ color: "#c0c0dd", fontSize: "13px", lineHeight: 1.5 }}>{app.offlineDelivery}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ComparisonTable({ selected }) {
  const features = [
    { key: "architecture", label: "Architecture" },
    { key: "encryption", label: "Encryption" },
    { key: "identifier", label: "Identity" },
    { key: "pfs", label: "Forward Secrecy", bool: true },
    { key: "postCompromise", label: "Post-Compromise", bool: true },
    { key: "quantumResistant", label: "Quantum Resistant", bool: true },
    { key: "anonymousSignup", label: "Anonymous Sign-up", bool: true },
    { key: "noPhoneRequired", label: "No Phone Required", bool: true },
    { key: "selfHostable", label: "Self-Hostable", bool: true },
    { key: "p2p", label: "Peer-to-Peer", bool: true },
    { key: "offlineCapable", label: "Works Offline", bool: true },
    { key: "voiceVideo", label: "Voice/Video", bool: true },
    { key: "multiDevice", label: "Multi-Device", bool: true },
    { key: "audited", label: "Security Audited", bool: true },
    { key: "metadataProtection", label: "Metadata Protection" },
    { key: "rateLimiting", label: "Rate Limiting" },
    { key: "offlineDelivery", label: "Offline Delivery" },
    { key: "jurisdiction", label: "Jurisdiction" },
  ];

  if (selected.length < 2) return (
    <div style={{ textAlign: "center", padding: "40px", color: "#6666aa", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px" }}>
      Select 2+ apps above to compare side-by-side
    </div>
  );

  return (
    <div style={{ overflowX: "auto", marginTop: "16px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "10px 14px", color: "#6666aa", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #2a2a4a" }}>Feature</th>
            {selected.map(a => (
              <th key={a.name} style={{ textAlign: "center", padding: "10px 14px", color: categories[a.category].color, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", borderBottom: "1px solid #2a2a4a", minWidth: "140px" }}>
                {a.icon} {a.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={f.key} style={{ background: i % 2 === 0 ? "#14142e" : "transparent" }}>
              <td style={{ padding: "8px 14px", color: "#9999bb", fontWeight: 500, borderBottom: "1px solid #1a1a35", whiteSpace: "nowrap" }}>{f.label}</td>
              {selected.map(a => (
                <td key={a.name} style={{ padding: "8px 14px", textAlign: "center", color: "#c0c0dd", borderBottom: "1px solid #1a1a35" }}>
                  {f.bool ? (
                    <div style={{ display: "flex", justifyContent: "center" }}><BoolCell value={a[f.key]} /></div>
                  ) : (
                    <span style={{ fontSize: "12px", lineHeight: 1.4 }}>{a[f.key]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DecentralizedMessengerComparison() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [filterCat, setFilterCat] = useState("all");

  const toggleCompare = (app) => {
    setCompareList(prev =>
      prev.find(a => a.name === app.name)
        ? prev.filter(a => a.name !== app.name)
        : prev.length < 5 ? [...prev, app] : prev
    );
  };

  const filtered = filterCat === "all" ? apps : apps.filter(a => a.category === filterCat);

  return (
    <div style={{
      background: "#0d0d1f",
      minHeight: "100vh",
      color: "#e0e0ff",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#6366f1", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>
              Comparative Analysis
            </span>
          </div>
          <h1 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700,
            margin: "0 0 8px 0",
            background: "linear-gradient(135deg, #e0e0ff, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}>
            Decentralized Messaging Apps
          </h1>
          <p style={{ color: "#6666aa", fontSize: "14px", maxWidth: "700px", lineHeight: 1.6, margin: 0 }}>
            An honest look at 12 messaging platforms — their architectures, encryption strengths, centralization trade-offs, and real-world drawbacks. Nothing is truly decentralized; the question is where the centralization hides.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid #2a2a4a", paddingBottom: "0" }}>
          {[["overview", "All Apps"], ["compare", `Compare (${compareList.length})`]].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              background: activeTab === id ? "#1a1a3a" : "transparent",
              border: "1px solid",
              borderColor: activeTab === id ? "#3a3a6a" : "transparent",
              borderBottom: activeTab === id ? "1px solid #1a1a3a" : "1px solid #2a2a4a",
              borderRadius: "8px 8px 0 0",
              padding: "10px 20px",
              color: activeTab === id ? "#e0e0ff" : "#6666aa",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: "-1px",
              transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        {activeTab === "overview" && (
          <>
            {/* Category Filter */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
              <FilterPill active={filterCat === "all"} onClick={() => setFilterCat("all")} color="#8888aa">All</FilterPill>
              {Object.entries(categories).map(([k, v]) => (
                <FilterPill key={k} active={filterCat === k} onClick={() => setFilterCat(k)} color={v.color}>{v.label}</FilterPill>
              ))}
            </div>

            {/* App Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px" }}>
              {filtered.map(app => (
                <div key={app.name} style={{ position: "relative" }}>
                  <AppCard app={app} onSelect={setSelectedApp} />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCompare(app); }}
                    style={{
                      position: "absolute", top: "12px", right: "12px",
                      background: compareList.find(a => a.name === app.name) ? "#6366f1" : "#2a2a4a",
                      border: "none", borderRadius: "6px",
                      padding: "4px 10px", cursor: "pointer",
                      color: "#e0e0ff", fontSize: "11px", fontWeight: 600,
                      fontFamily: "'JetBrains Mono', monospace",
                      transition: "all 0.2s",
                    }}
                  >
                    {compareList.find(a => a.name === app.name) ? "✓ Added" : "+ Compare"}
                  </button>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{
              background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: "12px",
              padding: "20px", marginTop: "8px",
            }}>
              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#6666aa", margin: "0 0 12px 0", textTransform: "uppercase", letterSpacing: "1px" }}>
                Architecture Spectrum
              </h3>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {Object.entries(categories).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: v.color }} />
                    <span style={{ fontSize: "12px", color: "#9999bb" }}><strong style={{ color: v.color }}>{v.label}</strong> — {v.desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "16px", fontSize: "12px", color: "#6666aa", lineHeight: 1.7 }}>
                <strong style={{ color: "#9999bb" }}>Key insight:</strong> Every app has centralization points. "Decentralized" is a spectrum, not a binary. Signal's centralized servers are transparent and well-audited. Matrix's federation defaults to matrix.org. Session's node network depends on token staking. SimpleX's default relays are run by one company. Even Briar depends on Tor's directory authorities. The question isn't whether centralization exists — it's whether you can escape it when needed.
              </div>
            </div>
          </>
        )}

        {activeTab === "compare" && (
          <div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              {apps.map(app => (
                <button key={app.name} onClick={() => toggleCompare(app)} style={{
                  background: compareList.find(a => a.name === app.name) ? `${categories[app.category].color}25` : "#1a1a2e",
                  border: `1px solid ${compareList.find(a => a.name === app.name) ? categories[app.category].color : "#2a2a4a"}`,
                  borderRadius: "8px", padding: "6px 14px", cursor: "pointer",
                  color: compareList.find(a => a.name === app.name) ? categories[app.category].color : "#6666aa",
                  fontSize: "12px", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
                  transition: "all 0.2s",
                }}>
                  {app.icon} {app.name}
                </button>
              ))}
            </div>
            <ComparisonTable selected={compareList} />
          </div>
        )}
      </div>

      {selectedApp && <DetailModal app={selectedApp} onClose={() => setSelectedApp(null)} />}
    </div>
  );
}

function FilterPill({ active, onClick, color, children }) {
  return (
    <button onClick={onClick} style={{
      background: active ? `${color}20` : "transparent",
      border: `1px solid ${active ? color : "#2a2a4a"}`,
      borderRadius: "20px",
      padding: "5px 14px",
      color: active ? color : "#6666aa",
      fontSize: "12px",
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'JetBrains Mono', monospace",
      transition: "all 0.2s",
    }}>{children}</button>
  );
}
