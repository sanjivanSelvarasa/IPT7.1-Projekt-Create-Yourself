import { createI18n } from "vue-i18n";
import landingpageDe from "./landingpage/de.json";
import landingpageEn from "./landingpage/en.json";
import landingpageFr from "./landingpage/fr.json";

import dashboardDe from "./dashboard/de.json";
import dashboardEn from "./dashboard/en.json";
import dashboardFr from "./dashboard/fr.json";

import cardDashboardDe from "./carddashboard/de.json";
import cardDashboardEn from "./carddashboard/en.json";
import cardDashboardFr from "./carddashboard/fr.json";

import footerDe from "@/i18n/footer/de.json";
import footerEn from "@/i18n/footer/en.json";
import footerFr from "@/i18n/footer/fr.json";

import loginDe from "./loginpage/de.json";
import loginEn from "./loginpage/en.json";
import loginFr from "./loginpage/fr.json";

import navDe from "@/i18n/nav/de.json";
import navEn from "@/i18n/nav/en.json";
import navFr from "@/i18n/nav/fr.json";

import registerDe from "@/i18n/registerpage/de.json";
import registerEn from "@/i18n/registerpage/en.json";
import registerFr from "@/i18n/registerpage/fr.json";

import profileDe from "@/i18n/profile/de.json";
import profileEn from "@/i18n/profile/en.json";
import profileFr from "@/i18n/profile/fr.json";

import settingsDe from "@/i18n/settings/de.json";
import settingsEn from "@/i18n/settings/en.json";
import settingsFr from "@/i18n/settings/fr.json";

import createPortfolioDe from "./createportfolio/de.json";
import createPortfolioEn from "./createportfolio/en.json";
import createPortfolioFr from "./createportfolio/fr.json";

const savedLang =
  localStorage.getItem("lang") ??
  (navigator.language === ("de" || "en" || "fr") ? navigator.language : "de");

export const i18n = createI18n({
  legacy: false,
  locale: savedLang,
  fallbackLocale: "de",
  messages: {
    de: {
      landingpage: landingpageDe,
      cardDashboard: cardDashboardDe,
      dashboard: dashboardDe,
      footer: footerDe,
      login: loginDe,
      navHome: navDe,
      register: registerDe,
      profile: profileDe,
      settings: settingsDe,
      createPortfolio: createPortfolioDe,
    },
    en: {
      landingpage: landingpageEn,
      cardDashboard: cardDashboardEn,
      dashboard: dashboardEn,
      footer: footerEn,
      login: loginEn,
      navHome: navEn,
      register: registerEn,
      profile: profileEn,
      settings: settingsEn,
      createPortfolio: createPortfolioEn,
    },
    fr: {
      landingpage: landingpageFr,
      cardDashboard: cardDashboardFr,
      dashboard: dashboardFr,
      footer: footerFr,
      login: loginFr,
      navHome: navFr,
      register: registerFr,
      profile: profileFr,
      settings: settingsFr,
      createPortfolio: createPortfolioFr,
    },
  },
});
