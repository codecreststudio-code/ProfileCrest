export interface LocaleDictionary {
  navbar: {
    banner: string;
    backHome: string;
    coffeeBtn: string;
    copyBtn: string;
    copied: string;
    downloadBtn: string;
  };
  hero: {
    titlePrefix: string;
    titleSpan: string;
    desc: string;
    placeholder: string;
    btn: string;
    subtext: string;
  };
  features: {
    tag: string;
    title: string;
    desc: string;
    list: {
      bento: { title: string; desc: string };
      footprint: { title: string; desc: string };
      metrics: { title: string; desc: string };
      tech: { title: string; desc: string };
      analytics: { title: string; desc: string };
      donation: { title: string; desc: string };
      widgets: { title: string; desc: string };
      trophies: { title: string; desc: string };
    };
  };
  cta: {
    title: string;
    desc: string;
    btn: string;
  };
  faq: {
    title: string;
    questions: { q: string; a: string }[];
  };
  footer: {
    tagline: string;
    links: {
      website: string;
      instagram: string;
      youtube: string;
      email: string;
    };
    attribution: string;
  };
  support: {
    title: string;
    supportersCount: string;
    aboutTitle: string;
    aboutText1: string;
    aboutText2: string;
    recentSupporters: string;
    loadingSupporters: string;
    noSupporters: string;
    boughtCoffee: string;
    boughtCoffees: string;
    formTitle: string;
    selectCurrency: string;
    numberCoffees: string;
    customQtyPlaceholder: string;
    totalAmount: string;
    nameLabel: string;
    namePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    secureNotice: string;
    customQtyLabel: string;
  };
  generator: {
    stepLabel: string;
    prevBtn: string;
    nextBtn: string;
    copyReadmeBtn: string;
    loading: string;
    localhostWarningTitle: string;
    localhostWarningDesc: string;
    emptyPreview: string;
    watermarkLabel: string;
    badgeStyleLabel: string;
    futureTechTitle: string;
    futureTechDesc: string;
    spotifyTitle: string;
    spotifyShow: string;
    spotifyTrack: string;
    spotifyArtist: string;
    spotifyUrl: string;
    timelineTitle: string;
    timelineShow: string;
    timelineAddBtn: string;
    timelineDateLabel: string;
    timelineTitleLabel: string;
    timelineDescLabel: string;
    devPlatformsTitle: string;
    devPlatformsShow: string;
    devPlatformsLeetcode: string;
    devPlatformsStackoverflow: string;
    devPlatformsChess: string;
  };
}

export const locales: Record<"en" | "es" | "hi", LocaleDictionary> = {
  en: {
    navbar: {
      banner: "⭐ Created by CodeCrest Studio – Visit our Website!",
      backHome: "← Back to Home",
      coffeeBtn: " Get Me a Coffee",
      copyBtn: " Copy Markdown",
      copied: "✓ Copied!",
      downloadBtn: " Download",
    },
    hero: {
      titlePrefix: "GitHub Profile",
      titleSpan: "README Generator",
      desc: "Create a premium, gorgeous GitHub Profile README with Bento grids, custom tech stacks, trophies, and dynamic synced memes & quotes, all for free!",
      placeholder: "Enter your GitHub username…",
      btn: "Generate README →",
      subtext: "No account required · Takes less than 60 seconds",
    },
    features: {
      tag: "Features",
      title: "We got everything that you need!",
      desc: "Create your perfect GitHub Profile README in the best possible way. Lots of features and tools included, all for free!",
      list: {
        bento: {
          title: "Bespoke Bento Dashboards",
          desc: "Structure your engineering journey with beautifully aligned, high-fidelity grid layouts. Modular card sections showcase your focus, accomplishments, and tech stack in a balanced visual system.",
        },
        footprint: {
          title: "Unified Digital Footprint",
          desc: "Build professional credibility by seamlessly embedding verified, responsive badges linking to your LinkedIn, X, YouTube, Dev.to, and 15+ engineering communities.",
        },
        metrics: {
          title: "Live Engineering Metrics",
          desc: "Showcase your git velocity, active streaks, and language proficiency with sleek, real-time cards that auto-update dynamically to reflect your daily commits.",
        },
        tech: {
          title: "Curated Tech Stack Badges",
          desc: "Select from 300+ customized modern technology shields. Highlight your software toolbox with cohesive, clean vector badges instead of cluttered markup.",
        },
        analytics: {
          title: "Privacy-First Traffic Analytics",
          desc: "Understand your profile reach and engagement securely. Embed lightweight page-view counters that track traffic metrics without cookies or tracker scripts.",
        },
        donation: {
          title: "Open-Source Support Gateways",
          desc: "Simplify developer sponsorship by integrating direct, call-to-action badges for leading donation platforms like Razorpay, Buy Me a Coffee, and Patreon.",
        },
        widgets: {
          title: "Self-Updating Developer Widgets",
          desc: "Animate your bio with ProfileCrest's secure serverless quote cards and developer meme feeds that fetch fresh, engaging items on every single page load.",
        },
        trophies: {
          title: "Gamified Trophies & Badges",
          desc: "Unlock and display elegant, vector-rendered GitHub achievements, milestones, and consistency streaks that celebrate your contributions to open source.",
        },
      },
    },
    cta: {
      title: "Ready to stand out?",
      desc: "Join thousands of developers who already use ProfileCrest to create stunning GitHub profiles.",
      btn: "Create My README →",
    },
    faq: {
      title: "Frequently Asked Questions",
      questions: [
        {
          q: "Are all profile details and fields mandatory?",
          a: "Not at all. Every block — including Bento grids, social icons, and stats widgets — is completely modular and optional. The only required field is your GitHub username. Configure and style your layout as you see fit!",
        },
        {
          q: "Do I need HTML or Markdown experience?",
          a: "No coding is required! ProfileCrest automates the entire compilation process, outputting clean, semantic, and standardized Markdown that you can copy and paste with a single click.",
        },
        {
          q: "How do I publish this README to my GitHub profile?",
          a: "Simply create a public repository on GitHub with a name matching your username exactly (e.g., 'octocat/octocat'), initialize it with a README.md file, and paste the generated markup directly into it. GitHub will render it automatically!",
        },
        {
          q: "Are there any licensing restrictions or usage fees?",
          a: "ProfileCrest is a 100% free, open-source portfolio suite created by CodeCrest Studio. There are no paywalls, locked premium features, or subscription fees — it is built to empower the global developer community.",
        },
        {
          q: "Can I update or change my portfolio details later?",
          a: "Absolutely! You can return to ProfileCrest at any time, adjust your tech stacks, add new projects, or switch layouts. The generator updates your markup instantly for easy redeployment.",
        },
      ],
    },
    footer: {
      tagline: "Premium GitHub Profile README Creator Suite by CodeCrest Studio",
      links: {
        website: "Website",
        instagram: "Instagram",
        youtube: "YouTube",
        email: "Email (Gmail)",
      },
      attribution: "Created with 💜 by CodeCrest Studio. © 2026 ProfileCrest.",
    },
    support: {
      title: "Buy CodeCrest Studio a Coffee",
      supportersCount: "Supporters",
      aboutTitle: "CodeCrest Studio",
      aboutText1: "Hey there! 🚀 We are CodeCrest Studio, and we build free, open-source utilities like ProfileCrest to empower engineers around the globe.",
      aboutText2: "We believe that premium, beautiful portfolios should be accessible to every developer for free. If our README generator saved you time or helped you land a role, consider buying us a coffee! Your support covers server hosting, API integrations, and keeps the project running.",
      recentSupporters: "Recent Supporters",
      loadingSupporters: "Loading live supporters feed…",
      noSupporters: "No supporters yet. Be the first to support us! 🧡",
      boughtCoffee: "bought 1 coffee",
      boughtCoffees: "bought {count} coffees",
      formTitle: "Buy a Coffee ☕",
      selectCurrency: "Select Currency",
      numberCoffees: "Number of Coffees",
      customQtyPlaceholder: "e.g. 6",
      totalAmount: "Total Support Amount:",
      nameLabel: "Your Name or Social Handle",
      namePlaceholder: "e.g. @yourhandle or Jane Doe",
      messageLabel: "Say something nice…",
      messagePlaceholder: "Write an encouraging message…",
      submitBtn: "Support",
      secureNotice: "Payments securely processed via Razorpay standard overlay.",
      customQtyLabel: "Enter custom coffee count",
    },
    generator: {
      stepLabel: "Step",
      prevBtn: "← Previous",
      nextBtn: "Next →",
      copyReadmeBtn: "📋 Copy README",
      loading: "Loading ProfileCrest Generator…",
      localhostWarningTitle: "⚠️ Local Development Warning:",
      localhostWarningDesc: "You are running locally on localhost. The self-hosted quote and random meme cards generated point to your local URL (http://localhost:3000). GitHub's proxy servers cannot access localhost, so these two images will appear broken on your real GitHub profile README. To fix this: Deploy your ProfileCrest generator repository to Vercel (or any host) first, and copy the final markdown from your deployed website!",
      emptyPreview: "Fill in the form to see your README preview here",
      watermarkLabel: "Include ProfileCrest watermark backlink (helps other developers discover the tool)",
      badgeStyleLabel: "Technology Badge Style",
      futureTechTitle: "Future Focus (Skills I am Learning)",
      futureTechDesc: "Select technologies you plan to learn or focus on in the future. These will be compiled as a separate, clean section.",
      spotifyTitle: "🎵 Spotify - Currently Playing Card",
      spotifyShow: "Show Spotify Track",
      spotifyTrack: "Track Name",
      spotifyArtist: "Artist Name",
      spotifyUrl: "Spotify URL (Optional)",
      timelineTitle: "📅 Career & Project Timeline",
      timelineShow: "Show Career Timeline",
      timelineAddBtn: "➕ Add Timeline Event",
      timelineDateLabel: "Date / Year",
      timelineTitleLabel: "Event Title",
      timelineDescLabel: "Event Description",
      devPlatformsTitle: "🏆 Developer Platform Profiles",
      devPlatformsShow: "Show Platform Profiles",
      devPlatformsLeetcode: "LeetCode Username",
      devPlatformsStackoverflow: "StackOverflow User ID",
      devPlatformsChess: "Chess.com Username",
    },
  },
  es: {
    navbar: {
      banner: "⭐ Creado por CodeCrest Studio – ¡Visite nuestro sitio web!",
      backHome: "← Volver al inicio",
      coffeeBtn: " Invítame a un café",
      copyBtn: " Copiar Markdown",
      copied: "¡Copiado!",
      downloadBtn: " Descargar",
    },
    hero: {
      titlePrefix: "Generador de README de",
      titleSpan: "perfil de GitHub",
      desc: "¡Crea un README de perfil de GitHub premium y magnífico con cuadrículas Bento, tecnologías personalizadas, trofeos y memes y citas dinámicas sincronizadas, todo gratis!",
      placeholder: "Ingresa tu usuario de GitHub…",
      btn: "Generar README →",
      subtext: "Sin registro · Toma menos de 60 segundos",
    },
    features: {
      tag: "Características",
      title: "¡Tenemos todo lo que necesitas!",
      desc: "Crea tu README de perfil de GitHub perfecto de la mejor manera posible. ¡Muchas funciones y herramientas incluidas, todo gratis!",
      list: {
        bento: {
          title: "Paneles Bento a Medida",
          desc: "Estructura tu trayectoria de ingeniería con diseños de cuadrícula hermosos y de alta fidelidad. Las secciones modulares muestran tus metas, logros y stack tecnológico en un sistema visual equilibrado.",
        },
        footprint: {
          title: "Huella Digital Unificada",
          desc: "Construye credibilidad profesional integrando insignias adaptables y verificadas que enlazan a tu LinkedIn, X, YouTube, Dev.to y más de 15 comunidades de ingeniería.",
        },
        metrics: {
          title: "Métricas de Ingeniería en Vivo",
          desc: "Muestra tu velocidad de git, rachas activas y dominio de idiomas con tarjetas elegantes en tiempo real que se actualizan automáticamente para reflejar tus commits diarios.",
        },
        tech: {
          title: "Insignias de Tecnologías Curadas",
          desc: "Selecciona entre más de 300 escudos tecnológicos modernos personalizados. Destaca tu caja de herramientas de software con insignias vectoriales limpias y coherentes.",
        },
        analytics: {
          title: "Analítica de Tráfico Privada",
          desc: "Comprende el alcance y la interacción de tu perfil de forma segura. Integra contadores de visitas ligeros que registran métricas sin cookies ni scripts de seguimiento.",
        },
        donation: {
          title: "Pasarelas de Apoyo Open-Source",
          desc: "Simplifica el patrocinio de desarrolladores integrando insignias directas para plataformas de donación líderes como Razorpay, Buy Me a Coffee y Patreon.",
        },
        widgets: {
          title: "Widgets Autoejecutables para Desarrolladores",
          desc: "Anima tu biografía con tarjetas de citas seguras sin servidor de ProfileCrest y feeds de memes que obtienen elementos frescos e interesantes en cada carga de página.",
        },
        trophies: {
          title: "Trofeos y Logros Gamificados",
          desc: "Desbloquea y muestra elegantes trofeos de GitHub renderizados en vector, hitos y rachas de consistencia que celebran tus contribuciones al código abierto.",
        },
      },
    },
    cta: {
      title: "¿Listo para destacar?",
      desc: "Únete a miles de desarrolladores que ya usan ProfileCrest para crear perfiles de GitHub impresionantes.",
      btn: "Crear mi README →",
    },
    faq: {
      title: "Preguntas Frecuentes",
      questions: [
        {
          q: "¿Son obligatorios todos los detalles y campos del perfil?",
          a: "Para nada. Cada bloque, incluyendo las cuadrículas Bento, los iconos sociales y los widgets de estadísticas, es completamente modular y opcional. El único campo obligatorio es tu nombre de usuario de GitHub. ¡Configura y diseña tu distribución como prefieras!",
        },
        {
          q: "¿Necesito experiencia en HTML o Markdown?",
          a: "¡No se requiere programar! ProfileCrest automatiza todo el proceso de compilación, generando un Markdown limpio, semántico y estandarizado que puedes copiar y pegar con un solo clic.",
        },
        {
          q: "¿Cómo publico este README en mi perfil de GitHub?",
          a: "Simplemente crea un repositorio público en GitHub con un nombre que coincida exactamente con tu nombre de usuario (por ejemplo, 'octocat/octocat'), inicialízalo con un archivo README.md y pega el marcado generado directamente en él. ¡GitHub lo renderizará automáticamente!",
        },
        {
          q: "¿Existen restricciones de licencia o tarifas de uso?",
          a: "ProfileCrest es una suite de portafolios 100% gratuita y de código abierto creada por CodeCrest Studio. No hay muros de pago, funciones premium bloqueadas ni tarifas de suscripción; está creada para empoderar a la comunidad global de desarrolladores.",
        },
        {
          q: "¿Puedo actualizar o cambiar los detalles de mi portafolio más tarde?",
          a: "¡Absolutamente! Puedes volver a ProfileCrest en cualquier momento, ajustar tus tecnologías, agregar nuevos proyectos o cambiar los diseños. El generador actualiza tu marcado al instante para una fácil redistribución.",
        },
      ],
    },
    footer: {
      tagline: "Suite premium de README para perfiles de GitHub por CodeCrest Studio",
      links: {
        website: "Sitio Web",
        instagram: "Instagram",
        youtube: "YouTube",
        email: "Correo (Gmail)",
      },
      attribution: "Creado con 💜 por CodeCrest Studio. © 2026 ProfileCrest.",
    },
    support: {
      title: "Invita a CodeCrest Studio a un Café",
      supportersCount: "Seguidores",
      aboutTitle: "CodeCrest Studio",
      aboutText1: "¡Hola! 🚀 Somos CodeCrest Studio, y creamos herramientas gratuitas y de código abierto como ProfileCrest para empoderar a ingenieros en todo el mundo.",
      aboutText2: "Creemos que los portafolios hermosos y premium deben ser accesibles para todos los desarrolladores de forma gratuita. Si nuestro generador de README te ahorró tiempo o te ayudó a conseguir un puesto, ¡considera invitarnos a un café! Tu apoyo cubre el alojamiento del servidor, las integraciones de API y mantiene el proyecto en marcha.",
      recentSupporters: "Colaboradores Recientes",
      loadingSupporters: "Cargando el feed de colaboradores en vivo…",
      noSupporters: "Aún no hay colaboradores. ¡Sé el primero en apoyarnos! 🧡",
      boughtCoffee: "invitó a 1 café",
      boughtCoffees: "invitó a {count} cafés",
      formTitle: "Invitar a un Café ☕",
      selectCurrency: "Seleccionar Moneda",
      numberCoffees: "Número de Cafés",
      customQtyPlaceholder: "ej. 6",
      totalAmount: "Monto total de apoyo:",
      nameLabel: "Tu Nombre o Usuario Social",
      namePlaceholder: "ej. @tuusuario o Juana de Arco",
      messageLabel: "Dinos algo lindo…",
      messagePlaceholder: "Escribe un mensaje de aliento…",
      submitBtn: "Apoyar con",
      secureNotice: "Pagos procesados de forma segura a través de la pasarela estándar de Razorpay.",
      customQtyLabel: "Ingresa el número personalizado de cafés",
    },
    generator: {
      stepLabel: "Paso",
      prevBtn: "← Anterior",
      nextBtn: "Siguiente →",
      copyReadmeBtn: "📋 Copiar README",
      loading: "Cargando generador de ProfileCrest…",
      localhostWarningTitle: "⚠️ Advertencia de desarrollo local:",
      localhostWarningDesc: "Estás ejecutando localmente en localhost. Las tarjetas autohospedadas de citas y memes generadas apuntan a tu URL local (http://localhost:3000). Los servidores proxy de GitHub no pueden acceder a localhost, por lo que estas dos imágenes aparecerán rotas en tu README real. Para solucionarlo: ¡Despliega tu repositorio del generador a Vercel primero y copia el markdown de tu sitio web desplegado!",
      emptyPreview: "Completa el formulario para ver la vista previa de tu README aquí",
      watermarkLabel: "Incluir enlace de marca de agua de ProfileCrest (ayuda a otros desarrolladores a descubrir la herramienta)",
      badgeStyleLabel: "Estilo de Insignia Tecnológica",
      futureTechTitle: "Enfoque Futuro (Tecnologías que estoy Aprendiendo)",
      futureTechDesc: "Selecciona las tecnologías que planeas aprender o en las que te enfocarás en el futuro. Se compilarán en una sección limpia y separada.",
      spotifyTitle: "🎵 Spotify - Tarjeta de Reproducción Actual",
      spotifyShow: "Mostrar Pista de Spotify",
      spotifyTrack: "Nombre de la Pista",
      spotifyArtist: "Nombre del Artista",
      spotifyUrl: "URL de Spotify (Opcional)",
      timelineTitle: "📅 Línea de Tiempo de Carrera y Proyectos",
      timelineShow: "Mostrar Línea de Tiempo",
      timelineAddBtn: "➕ Agregar Evento a la Línea de Tiempo",
      timelineDateLabel: "Fecha / Año",
      timelineTitleLabel: "Título del Evento",
      timelineDescLabel: "Descripción del Evento",
      devPlatformsTitle: "🏆 Perfiles de Plataformas de Desarrollo",
      devPlatformsShow: "Mostrar Perfiles de Plataforma",
      devPlatformsLeetcode: "Usuario de LeetCode",
      devPlatformsStackoverflow: "ID de Usuario de StackOverflow",
      devPlatformsChess: "Usuario de Chess.com",
    },
  },
  hi: {
    navbar: {
      banner: "⭐ कोडक्रेस्ट स्टूडियो द्वारा निर्मित – हमारी वेबसाइट पर जाएँ!",
      backHome: "← होम पर वापस जाएँ",
      coffeeBtn: " मेरे लिए एक कॉफ़ी लें",
      copyBtn: " मार्कडाउन कॉपी करें",
      copied: "✓ कॉपी किया गया!",
      downloadBtn: " डाउनलोड करें",
    },
    hero: {
      titlePrefix: "गिटहब प्रोफाइल",
      titleSpan: "README जेनरेटर",
      desc: "बेंटो ग्रिड, कस्टम टेक स्टैक, ट्राफियां और लाइव सिंक किए गए मीम्स और कोट्स के साथ एक प्रीमियम, भव्य गिटहब प्रोफाइल README बनाएं, सब कुछ बिल्कुल मुफ्त!",
      placeholder: "अपना गिटहब यूजरनेम दर्ज करें…",
      btn: "README जेनरेट करें →",
      subtext: "किसी अकाउंट की आवश्यकता नहीं · 60 सेकंड से भी कम समय लगता है",
    },
    features: {
      tag: "विशेषताएँ",
      title: "हमारे पास वह सब कुछ है जो आपको चाहिए!",
      desc: "सर्वोत्तम संभव तरीके से अपना आदर्श गिटहब प्रोफाइल README बनाएं। बहुत सारी सुविधाएँ और उपकरण शामिल हैं, सब कुछ मुफ्त में!",
      list: {
        bento: {
          title: "बेस्पोक बेंटो डैशबोर्ड",
          desc: "सुंदर रूप से संरेखित, उच्च-सटीकता ग्रिड लेआउट के साथ अपनी इंजीनियरिंग यात्रा को व्यवस्थित करें। मॉड्यूलर कार्ड सेक्शन एक संतुलित दृश्य प्रणाली में आपके फोकस, उपलब्धियों और टेक स्टैक को प्रदर्शित करते हैं।",
        },
        footprint: {
          title: "एकीकृत डिजिटल पदचिह्न",
          desc: "अपने लिंक्डइन, एक्स, यूट्यूब, देव.टू और 15+ इंजीनियरिंग समुदायों से जोड़ने वाले सत्यापित, उत्तरदायी बैज को सहजता से एम्बेड करके पेशेवर विश्वसनीयता बनाएं।",
        },
        metrics: {
          title: "लाइव इंजीनियरिंग मेट्रिक्स",
          desc: "चिकने, वास्तविक समय के कार्डों के साथ अपनी गिट वेलोसिटी, सक्रिय स्ट्रीक्स और भाषा दक्षता प्रदर्शित करें जो आपके दैनिक कमिट को प्रतिबिंबित करने के लिए स्वचालित रूप से अपडेट होते हैं।",
        },
        tech: {
          title: "क्यूरेटेड टेक स्टैक बैज",
          desc: "300+ अनुकूलित आधुनिक तकनीक शील्ड्स में से चुनें। अव्यवस्थित मार्कअप के बजाय सुसंगत, साफ वेक्टर बैज के साथ अपने सॉफ्टवेयर टूलबॉक्स को हाइलाइट करें।",
        },
        analytics: {
          title: "गोपनीयता-प्रथम ट्रैफ़िक एनालिटिक्स",
          desc: "अपनी प्रोफ़ाइल की पहुँच और जुड़ाव को सुरक्षित रूप से समझें। हल्के पेज-व्यू काउंटर एम्बेड करें जो बिना कुकीज़ या ट्रैकर स्क्रिप्ट के ट्रैफ़िक मेट्रिक्स को ट्रैक करते हैं।",
        },
        donation: {
          title: "ओपन-सोर्स सपोर्ट गेटवे",
          desc: "रेज़रपे, बाय मी अ कॉफ़ी और पैट्रियन जैसे अग्रणी दान प्लेटफार्मों के लिए सीधे, कॉल-टू-एक्शन बैज को एकीकृत करके डेवलपर प्रायोजन को सरल बनाएं।",
        },
        widgets: {
          title: "स्वयं-अपडेट होने वाले डेवलपर विजेट",
          desc: "प्रोफ़ाइलक्रेस्ट के सुरक्षित सर्वरलेस कोट कार्ड और डेवलपर मीम फ़ीड के साथ अपने बायो को जीवंत बनाएं जो हर पेज लोड पर ताज़ा, आकर्षक आइटम लाते हैं।",
        },
        trophies: {
          title: "गेमीफाइड ट्राफियां और बैज",
          desc: "शानदार, वेक्टर-रेंडर गिटहब उपलब्धियों, मील के पत्थर और निरंतरता स्ट्रीक्स को अनलॉक और प्रदर्शित करें जो ओपन सोर्स में आपके योगदान का जश्न मनाते हैं।",
        },
      },
    },
    cta: {
      title: "क्या आप अलग दिखने के लिए तैयार हैं?",
      desc: "उन हज़ारों डेवलपर्स में शामिल हों जो पहले से ही शानदार गिटहब प्रोफाइल बनाने के लिए प्रोफाइलक्रेस्ट का उपयोग कर रहे हैं।",
      btn: "मेरा README बनाएं →",
    },
    faq: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      questions: [
        {
          q: "क्या सभी प्रोफ़ाइल विवरण और फ़ील्ड अनिवार्य हैं?",
          a: "बिल्कुल नहीं। बेंटो ग्रिड, सोशल आइकन और स्टैट्स विजेट सहित हर ब्लॉक पूरी तरह से मॉड्यूलर और वैकल्पिक है। एकमात्र आवश्यक फ़ील्ड आपका गिटहब यूजरनेम है। अपनी इच्छानुसार अपना लेआउट कॉन्फ़िगर और स्टाइल करें!",
        },
        {
          q: "क्या मुझे HTML या मार्कडाउन अनुभव की आवश्यकता है?",
          a: "किसी कोडिंग की आवश्यकता नहीं है! प्रोफाइलक्रेस्ट संपूर्ण संकलन प्रक्रिया को स्वचालित करता है, स्वच्छ, सिमेंटिक और मानकीकृत मार्कडाउन आउटपुट करता है जिसे आप एक क्लिक से कॉपी और पेस्ट कर सकते हैं।",
        },
        {
          q: "मैं इस README को अपनी गिटहब प्रोफ़ाइल पर कैसे प्रकाशित करूँ?",
          a: "बस गिटहब पर अपने यूजरनेम से बिल्कुल मेल खाता हुआ एक सार्वजनिक रिपॉजिटरी बनाएं (जैसे, 'octocat/octocat'), इसे README.md फ़ाइल के साथ इनिशियलाइज़ करें, और जेनरेट किए गए मार्कअप को सीधे उसमें पेस्ट करें। गिटहब इसे स्वचालित रूप से रेंडर करेगा!",
        },
        {
          q: "क्या कोई लाइसेंसिंग प्रतिबंध या उपयोग शुल्क हैं?",
          a: "प्रोफाइलक्रेस्ट कोडक्रेस्ट स्टूडियो द्वारा बनाई गई एक 100% मुफ्त, ओपन-सोर्स पोर्टफोलियो सूट है। कोई पेवॉल, लॉक की गई प्रीमियम सुविधाएं या सदस्यता शुल्क नहीं है - यह वैश्विक डेवलपर समुदाय को सशक्त बनाने के लिए बनाया गया है।",
        },
        {
          q: "क्या मैं अपने पोर्टफोलियो विवरण को बाद में अपडेट या बदल सकता हूँ?",
          a: "बिल्कुल! आप किसी भी समय प्रोफाइलक्रेस्ट पर वापस आ सकते हैं, अपने टेक स्टैक को समायोजित कर सकते हैं, नए प्रोजेक्ट जोड़ सकते हैं या लेआउट बदल सकते हैं। आसान पुनः तैनाती के लिए जेनरेटर आपके मार्कअप को तुरंत अपडेट करता है।",
        },
      ],
    },
    footer: {
      tagline: "कोडक्रेस्ट स्टूडियो द्वारा प्रीमियम गिटहब प्रोफाइल README क्रिएटर सूट",
      links: {
        website: "वेबसाइट",
        instagram: "इंस्टाग्राम",
        youtube: "यूट्यूब",
        email: "ईमेल (जीमेल)",
      },
      attribution: "कोडक्रेस्ट स्टूडियो द्वारा 💜 के साथ निर्मित। © 2026 प्रोफाइलक्रेस्ट।",
    },
    support: {
      title: "कोडक्रेस्ट स्टूडियो को एक कॉफ़ी पिलाएं",
      supportersCount: "समर्थक",
      aboutTitle: "कोडक्रेस्ट स्टूडियो",
      aboutText1: "नमस्ते! 🚀 हम कोडक्रेस्ट स्टूडियो हैं, और हम दुनिया भर के इंजीनियरों को सशक्त बनाने के लिए प्रोफाइलक्रेस्ट जैसी मुफ्त, ओपन-सोर्स उपयोगिताएँ बनाते हैं।",
      aboutText2: "हमारा मानना है कि प्रीमियम, सुंदर पोर्टफोलियो हर डेवलपर के लिए मुफ्त में उपलब्ध होना चाहिए। यदि हमारे README जेनरेटर ने आपका समय बचाया या नौकरी पाने में आपकी मदद की, तो हमें एक कॉफ़ी पिलाने पर विचार करें! आपका समर्थन सर्वर होस्टिंग, एपीआई एकीकरण को कवर करता है और प्रोजेक्ट को चालू रखता है।",
      recentSupporters: "हाल के समर्थक",
      loadingSupporters: "लाइव समर्थक फ़ीड लोड हो रहा है…",
      noSupporters: "अभी तक कोई समर्थक नहीं है। हमारा समर्थन करने वाले पहले व्यक्ति बनें! 🧡",
      boughtCoffee: "ने 1 कॉफ़ी ख़रीदी",
      boughtCoffees: "ने {count} कॉफ़ियाँ ख़रीदीं",
      formTitle: "एक कॉफ़ी खरीदें ☕",
      selectCurrency: "मुद्रा चुनें",
      numberCoffees: "कॉफ़ी की संख्या",
      customQtyPlaceholder: "जैसे 6",
      totalAmount: "कुल समर्थन राशि:",
      nameLabel: "आपका नाम या सोशल हैंडल",
      namePlaceholder: "जैसे @yourhandle या रानी लक्ष्मीबाई",
      messageLabel: "कुछ अच्छा कहें…",
      messagePlaceholder: "एक उत्साहजनक संदेश लिखें…",
      submitBtn: "समर्थन करें",
      secureNotice: "रेज़रपे मानक ओवरले के माध्यम से भुगतान सुरक्षित रूप से संसाधित किए जाते हैं।",
      customQtyLabel: "कस्टम कॉफ़ी संख्या दर्ज करें",
    },
    generator: {
      stepLabel: "चरण",
      prevBtn: "← पिछला",
      nextBtn: "अगला →",
      copyReadmeBtn: "📋 README कॉपी करें",
      loading: "प्रोफाइलक्रेस्ट जेनरेटर लोड हो रहा है…",
      localhostWarningTitle: "⚠️ स्थानीय विकास चेतावनी:",
      localhostWarningDesc: "आप लोकलहोस्ट पर स्थानीय रूप से चल रहे हैं। जेनरेट किए गए सेल्फ-होस्टेड कोट और रैंडम मीम कार्ड आपके स्थानीय यूआरएल (http://localhost:3000) की ओर इशारा करते हैं। गिटहब के प्रॉक्सी सर्वर लोकलहोस्ट तक नहीं पहुंच सकते हैं, इसलिए ये दो छवियां आपके वास्तविक गिटहब प्रोफाइल README पर टूटी हुई दिखाई देंगी। इसे ठीक करने के लिए: पहले अपने प्रोफाइलक्रेस्ट जेनरेटर रिपॉजिटरी को वर्सेल (या किसी होस्ट) पर डिप्लॉय करें, और आपकी डिप्लॉय की गई वेबसाइट से अंतिम मार्कडाउन कॉपी करें!",
      emptyPreview: "यहाँ अपना README पूर्वावलोकन देखने के लिए फ़ॉर्म भरें",
      watermarkLabel: "प्रोफ़ाइलक्रेस्ट वॉटरमार्क बैकलिंक शामिल करें (अन्य डेवलपर्स को टूल खोजने में मदद करता है)",
      badgeStyleLabel: "तकनीकी बैज शैली",
      futureTechTitle: "भविष्य का फोकस (तकनीक जो मैं सीख रहा हूँ)",
      futureTechDesc: "उन तकनीकों का चयन करें जिन्हें आप भविष्य में सीखने या ध्यान केंद्रित करने की योजना बना रहे हैं। इन्हें एक अलग, स्वच्छ अनुभाग के रूप में संकलित किया जाएगा।",
      spotifyTitle: "🎵 स्पॉटिफ़ाई - वर्तमान में चल रहा गाना",
      spotifyShow: "स्पॉटिफ़ाई ट्रैक दिखाएं",
      spotifyTrack: "गाने का नाम",
      spotifyArtist: "कलाकार का नाम",
      spotifyUrl: "स्पॉटिफ़ाई यूआरएल (वैकल्पिक)",
      timelineTitle: "📅 करियर और प्रोजेक्ट समयरेखा",
      timelineShow: "करियर समयरेखा दिखाएं",
      timelineAddBtn: "➕ समयरेखा कार्यक्रम जोड़ें",
      timelineDateLabel: "तिथि / वर्ष",
      timelineTitleLabel: "कार्यक्रम का शीर्षक",
      timelineDescLabel: "कार्यक्रम का विवरण",
      devPlatformsTitle: "🏆 डेवलपर प्लेटफ़ॉर्म प्रोफ़ाइल",
      devPlatformsShow: "प्लेटफ़ॉर्म प्रोफ़ाइल दिखाएं",
      devPlatformsLeetcode: "लीटकोड यूजरनेम",
      devPlatformsStackoverflow: "स्टैकओवरफ़्लो यूजर आईडी",
      devPlatformsChess: "Chess.com यूजरनेम",
    },
  },
};
