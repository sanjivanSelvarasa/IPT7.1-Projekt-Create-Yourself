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

import navappDe from "@/i18n/navapp/de.json";
import navappEn from "@/i18n/navapp/en.json";
import navappFr from "@/i18n/navapp/fr.json";

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

import editorDe from "./editor/de.json";
import editorEn from "./editor/en.json";
import editorFr from "./editor/fr.json";

import publishDe from "./publish/de.json";
import publishEn from "./publish/en.json";
import publishFr from "./publish/fr.json";

import previewNavbarDe from './previewnavbar/de.json'
import previewNavbarEn from './previewnavbar/en.json'
import previewNavbarFr from './previewnavbar/fr.json'

import previewFooterDe from './previewfooter/de.json'
import previewFooterEn from './previewfooter/en.json'
import previewFooterFr from './previewfooter/fr.json'

import publishconfirmDe from './publishconfirm/de.json'
import publishconfirmEn from './publishconfirm/en.json'
import publishconfirmFr from './publishconfirm/fr.json'

import editorContactDe from './editor/contact/de.json'
import editorContactEn from './editor/contact/en.json'
import editorContactFr from './editor/contact/fr.json'

import editorEmptyDe from './editor/empty/de.json'
import editorEmptyEn from './editor/empty/en.json'
import editorEmptyFr from './editor/empty/fr.json'

import editorExperienceDe from './editor/experience/de.json'
import editorExperienceEn from './editor/experience/en.json'
import editorExperienceFr from './editor/experience/fr.json'

import editorHeroDe from './editor/hero/de.json'
import editorHeroEn from './editor/hero/en.json'
import editorHeroFr from './editor/hero/fr.json'

import editorProjectDe from './editor/project/de.json'
import editorProjectEn from './editor/project/en.json'
import editorProjectFr from './editor/project/fr.json'

import editorRightsideDe from './editor/rightside/de.json'
import editorRightsideEn from './editor/rightside/en.json'
import editorRightsideFr from './editor/rightside/fr.json'

import editorRightsideContactDe from './editor/rightside/rightsidecontact/de.json'
import editorRightsideContactEn from './editor/rightside/rightsidecontact/en.json'
import editorRightsideContactFr from './editor/rightside/rightsidecontact/fr.json'

import editorRightsideExperienceDe from './editor/rightside/rightsideexperience/de.json'
import editorRightsideExperienceEn from './editor/rightside/rightsideexperience/en.json'
import editorRightsideExperienceFr from './editor/rightside/rightsideexperience/fr.json'

import editorRightsideHeroDe from './editor/rightside/rightsidehero/de.json'
import editorRightsideHeroEn from './editor/rightside/rightsidehero/en.json'
import editorRightsideHeroFr from './editor/rightside/rightsidehero/fr.json'

import editorRightsideProjectsDe from './editor/rightside/rightsideprojects/de.json'
import editorRightsideProjectsEn from './editor/rightside/rightsideprojects/en.json'
import editorRightsideProjectsFr from './editor/rightside/rightsideprojects/fr.json'

import editorRightsideSkillsDe from './editor/rightside/rightsideskills/de.json'
import editorRightsideSkillsEn from './editor/rightside/rightsideskills/en.json'
import editorRightsideSkillsFr from './editor/rightside/rightsideskills/fr.json'

import editorRightsideTrainingDe from './editor/rightside/rightsidetraining/de.json'
import editorRightsideTrainingEn from './editor/rightside/rightsidetraining/en.json'
import editorRightsideTrainingFr from './editor/rightside/rightsidetraining/fr.json'

import editorSkillsDe from './editor/skills/de.json'
import editorSkillsEn from './editor/skills/en.json'
import editorSkillsFr from './editor/skills/fr.json'

import editorTrainingDe from './editor/training/de.json'
import editorTrainingEn from './editor/training/en.json'
import editorTrainingFr from './editor/training/fr.json'

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
      navapp: navappDe,
      register: registerDe,
      profile: profileDe,
      settings: settingsDe,
      createPortfolio: createPortfolioDe,
      editor: editorDe,
      publish: publishDe,
      previewnavbar: previewNavbarDe,
      previewfooter: previewFooterDe,
      publishconfirm: publishconfirmDe,
      editorcontact: editorContactDe,
      editorempty: editorEmptyDe,
      editorexperience: editorExperienceDe,
      editorhero: editorHeroDe,
      editorproject: editorProjectDe,
      editorrightside: editorRightsideDe,
      editorrightsidecontact: editorRightsideContactDe,
      editorrightsideexperience: editorRightsideExperienceDe,
      editorrightsidehero: editorRightsideHeroDe,
      editorrightsideprojects: editorRightsideProjectsDe,
      editorrightsidaskills: editorRightsideSkillsDe,
      editorrightsidetraining: editorRightsideTrainingDe,
      editorskills: editorSkillsDe,
      editortraining: editorTrainingDe,
    },
    en: {
      landingpage: landingpageEn,
      cardDashboard: cardDashboardEn,
      dashboard: dashboardEn,
      footer: footerEn,
      login: loginEn,
      navHome: navEn,
      navapp: navappEn,
      register: registerEn,
      profile: profileEn,
      settings: settingsEn,
      createPortfolio: createPortfolioEn,
      editor: editorEn,
      publish: publishEn,
      previewnavbar: previewNavbarEn,
      previewfooter: previewFooterEn,
      publishconfirm: publishconfirmEn,
      editorcontact: editorContactEn,
      editorempty: editorEmptyEn,
      editorexperience: editorExperienceEn,
      editorhero: editorHeroEn,
      editorproject: editorProjectEn,
      editorrightside: editorRightsideEn,
      editorrightsidecontact: editorRightsideContactEn,
      editorrightsideexperience: editorRightsideExperienceEn,
      editorrightsidehero: editorRightsideHeroEn,
      editorrightsideprojects: editorRightsideProjectsEn,
      editorrightsidaskills: editorRightsideSkillsEn,
      editorrightsidetraining: editorRightsideTrainingEn,
      editorskills: editorSkillsEn,
      editortraining: editorTrainingEn,
    },
    fr: {
      landingpage: landingpageFr,
      cardDashboard: cardDashboardFr,
      dashboard: dashboardFr,
      footer: footerFr,
      login: loginFr,
      navHome: navFr,
      navapp: navappFr,
      register: registerFr,
      profile: profileFr,
      settings: settingsFr,
      createPortfolio: createPortfolioFr,
      editor: editorFr,
      publish: publishFr,
      previewnavbar: previewNavbarFr,
      previewfooter: previewFooterFr,
      publishconfirm: publishconfirmFr,
      editorcontact: editorContactFr,
      editorempty: editorEmptyFr,
      editorexperience: editorExperienceFr,
      editorhero: editorHeroFr,
      editorproject: editorProjectFr,
      editorrightside: editorRightsideFr,
      editorrightsidecontact: editorRightsideContactFr,
      editorrightsideexperience: editorRightsideExperienceFr,
      editorrightsidehero: editorRightsideHeroFr,
      editorrightsideprojects: editorRightsideProjectsFr,
      editorrightsidaskills: editorRightsideSkillsFr,
      editorrightsidetraining: editorRightsideTrainingFr,
      editorskills: editorSkillsFr,
      editortraining: editorTrainingFr,
    },
  },
});
