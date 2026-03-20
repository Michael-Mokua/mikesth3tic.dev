"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "EN" | "SW" | "FR" | "ES";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    EN: {
        "nav.home": "Home",
        "nav.services": "Services",
        "nav.process": "Process",
        "nav.work": "Work",
        "nav.vault": "Vault",
        "nav.blog": "Blog",
        "nav.about": "About",
        "nav.lab": "Lab",
        "nav.founders": "Founders",

        "about.h1.1": "Disrupt.",
        "about.h1.2": "Automate",
        "about.h1.3": "Dominate",
        "hero.badge": "Software-First Technology Studio | STATUS: READY FOR SCALE",


        "hero.slogan": "We design, build, and scale modern software products.",
        "hero.cta.start": "Start a Project",
        "hero.cta.portfolio": "Download Architecture Portfolio PDF",
        "status.optimal": "Status: OPTIMAL",
        "footer.rights": "All Rights Reserved",
    },
    SW: {
        "nav.home": "Nyumbani",
        "nav.services": "Huduma",
        "nav.process": "Mchakato",
        "nav.work": "Kazi",
        "nav.vault": "Vault",
        "nav.blog": "Blogu",
        "nav.about": "Kuhusu",
        "nav.lab": "Labu",
        "nav.founders": "Waanzilishi",

        "about.h1.1": "Vuruga.",
        "about.h1.2": "Otomatisha",
        "about.h1.3": "Tawala",
        "hero.badge": "Studio ya Teknolojia ya Programu | HALI: TAYARI KWA MIELEKEO",


        "hero.slogan": "Tunatengeneza, tunajenga, na tunakuza bidhaa za kisasa za programu.",
        "hero.cta.start": "Anza Mradi",
        "hero.cta.portfolio": "Pakua PDF ya Portfolio ya Usanifu",
        "status.optimal": "Hali: BORA",
        "footer.rights": "Haki Zote Zimehifadhiwa",
    },
    FR: {
        "nav.home": "Accueil",
        "nav.services": "Services",
        "nav.process": "Processus",
        "nav.work": "Travail",
        "nav.vault": "Coffre",
        "nav.blog": "Blog",
        "nav.about": "À Propos",
        "nav.lab": "Labo",
        "nav.founders": "Fondateurs",

        "about.h1.1": "Perturber.",
        "about.h1.2": "Automatiser",
        "about.h1.3": "Dominer",
        "hero.badge": "Studio de Technologie Logicielle | STATUT : PRÊT POUR L'ÉCHELLE",


        "hero.slogan": "Nous concevons, construisons et développons des produits logiciels modernes.",
        "hero.cta.start": "Démarrer un Projet",
        "hero.cta.portfolio": "Télécharger le Portfolio d'Architecture PDF",
        "status.optimal": "Statut : OPTIMAL",
        "footer.rights": "Tous Droits Réservés",
    },
    ES: {
        "nav.home": "Inicio",
        "nav.services": "Servicios",
        "nav.process": "Proceso",
        "nav.work": "Trabajo",
        "nav.vault": "Bóveda",
        "nav.blog": "Blog",
        "nav.about": "Sobre Nosotros",
        "nav.lab": "Laboratorio",
        "nav.founders": "Fundadores",

        "about.h1.1": "Interrumpir.",
        "about.h1.2": "Automatizar",
        "about.h1.3": "Dominar",
        "hero.badge": "Estudio de Tecnología de Software | ESTADO: LISTO PARA ESCALAR",


        "hero.slogan": "Diseñamos, construimos y escalamos productos de software modernos.",
        "hero.cta.start": "Iniciar un Proyecto",
        "hero.cta.portfolio": "Descargar PDF de Portafolio de Arquitectura",
        "status.optimal": "Estado: OPTIMAL",
        "footer.rights": "Todos los Derechos Reservados",
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("EN");

    useEffect(() => {
        const savedLang = localStorage.getItem("sys_lang") as Language;
        if (savedLang && translations[savedLang]) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("sys_lang", lang);
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useTranslation must be used within a LanguageProvider");
    }
    return context;
}
