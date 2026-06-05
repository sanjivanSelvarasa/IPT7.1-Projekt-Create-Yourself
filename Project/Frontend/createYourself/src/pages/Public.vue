<script lang="ts" setup>
  import {useRoute} from "vue-router";
  import {computed, onMounted, ref} from "vue";
  import {usePortfolioStore} from "@/stores/portfolioStore.ts";
  import NavPublic from "@/components/layout/NavPublic.vue";
  import SvgStruct from "@/components/ui/SvgStruct.vue";
  import PublishModulStruct from "@/components/ui/PublishModulStruct.vue";
  import PublishProjectElement from "@/components/ui/PublishProjectElement.vue";
  import {usePortfolioSectionStore} from "@/stores/portfolioSectionStore.ts";
  import type {PortfolioType} from "@/types/portfolioType.ts";
  import type {TextBlockContent} from "@/types/textBlockContent.ts";
  import type {ModulType} from "@/types/modulType.ts";
  import {useEditorBlockStore} from "@/stores/editorBlockStore.ts";
  import {useSkillStore} from "@/stores/skillStore.ts";
  import {useProjectStore} from "@/stores/projectStore.ts";
  import {useEducationStore} from "@/stores/educationStore.ts";
  import {useExperienceStore} from "@/stores/experienceStore.ts";
  import {useSocialLinkStore} from "@/stores/socialLinkStore.ts";
  import PublishSkillModul from "@/components/ui/PublishSkillModul.vue";
  import PublishSkillElement from "@/components/ui/PublishSkillElement.vue";
  import PublishEducationElement from "@/components/ui/PublishEducationElement.vue";
  import PublishLinkModul from "@/components/ui/editor/PublishLinkModul.vue";
  import PublishLinkElement from "@/components/ui/PublishLinkElement.vue";
  import PublishTextElement from "@/components/ui/editor/PublishTextElement.vue";

  const route = useRoute();
  const portfolioSlug = String(route.params.slug);

  const portfolioStore = usePortfolioStore();
  const portfolioSectionStore = usePortfolioSectionStore();
  const editorBlockStore = useEditorBlockStore();
  const skillStore = useSkillStore();
  const projectStore = useProjectStore();
  const educationStore = useEducationStore();
  const experienceStore = useExperienceStore();
  const socialLinkStore = useSocialLinkStore();

  const portfolio = ref<any | null>(null);
  const portfolioFacts = ref<PortfolioType | null>(null);

  const sortedSections = ref<any[] | null>(null);
  async function loadSortedSections() {
    const res = [...portfolioSectionStore.sections].sort((a, b) => a.sortOrder - b.sortOrder)

    sortedSections.value = await Promise.all(
      res.map(async (s) => ({
        ...s,
        editorBlock: await getEditorForSection(s.id)
      }))
    )
  }

  async function getEditorForSection(sectionId: number){
    if(portfolioFacts.value === null) return;

    const res = await editorBlockStore.getEditorBlock(portfolioFacts.value.id, portfolioFacts.value.currentVersionId, sectionId)

    return res?.map(e => {
      if(e.blockType === 'text'){
        return {
          ...e,
          textBlockContent: JSON.parse(e.contentJson) as TextBlockContent
        }
      }

      if(e.blockType === 'skill'){
        const content = JSON.parse(e.contentJson) as ModulType
        return {
          ...e,
          skills: skillStore.skills?.filter(t => content.ids?.includes(t.id))
        }
      }

      if(e.blockType === 'project'){
        const content = JSON.parse(e.contentJson) as ModulType
        return {
          ...e,
          project: projectStore.projects?.filter(t => content.ids?.includes(t.id))
        }
      }

      if(e.blockType === 'education'){
        const content = JSON.parse(e.contentJson) as ModulType
        return {
          ...e,
          education: educationStore.educations?.filter(t => content.ids?.includes(t.id))
        }
      }

      if(e.blockType === 'experience'){
        const content = JSON.parse(e.contentJson) as ModulType
        return {
          ...e,
          experience: experienceStore.experiences?.filter(t => content.ids?.includes(t.id))
        }
      }

      if(e.blockType === 'link'){
        const content = JSON.parse(e.contentJson) as ModulType
        return {
          ...e,
          link: socialLinkStore.socialLinks?.filter(t => content.ids?.includes(t.id))
        }
      }

      return e
    }) ?? []
  }

  onMounted(async () => {
    portfolio.value = await portfolioStore.getFullPortfolioBySlug(portfolioSlug)
    portfolioFacts.value = portfolio.value.portfolio

    if(portfolioFacts.value !== null){
      await skillStore.getSkills(portfolioFacts.value?.id)
      await projectStore.getProjects(portfolioFacts.value?.id)
      await educationStore.getEducation(portfolioFacts.value?.id)
      await experienceStore.getExperience(portfolioFacts.value?.id)
      await socialLinkStore.getSocialLink(portfolioFacts.value?.id)

      await portfolioSectionStore.getSections(portfolioFacts.value?.id, portfolioFacts.value?.currentVersionId)
      await loadSortedSections()
    }

    console.log(sortedSections.value)
  })

  const firstname = ref<string>('Egor')
  const lastname = ref<string>('Biriukov')

  const mapForTabs = computed(() => {
    if(sortedSections?.value === null) return;

    return sortedSections?.value.map(s => ({
      sectionType: s.sectionType,
      id: s.id,
    }))
  })

  const brands = [
    {
      name: 'youtube',
      icon: 'fa-brands fa-youtube',
    },
    {
      name: 'email',
      icon: 'fa-regular fa-envelope',
    },
    {
      name: 'github',
      icon: 'fa-brands fa-github',
    },
    {
      name: 'linkedin',
      icon: 'fa-brands fa-linkedin',
    },
    {
      name: 'twitter',
      icon: 'fa-brands fa-x-twitter',
    },
    {
      name: 'instagram',
      icon: 'fa-brands fa-instagram',
    },
    {
      name: 'tiktok',
      icon: 'fa-brands fa-tiktok',
    },
  ]
  function getBrandSvg(text: string) {
    for (const brand of brands) {
      if(text.trim().toLowerCase().includes(brand.name.toLowerCase()))
        return brand.icon;
    }

    return 'fa-solid fa-globe'
  }
</script>

<template>
  <div class="w-full h-full bg-[var(--background-color)] max-w-[100vw] overflow-x-scroll">
    <div class="max-w-[1200px] mx-auto mb-5 px-4">
      <NavPublic :firstname="firstname" :lastname="lastname" :tabs="mapForTabs"></NavPublic>

      <main>
        <section v-for="section in sortedSections" :key="section.id" :id="`${section.id}`">
          <header v-if="section.sectionType === 'Hero Section' " class="h-[100vh] w-full flex justify-center items-center">
            <div class="max-w-[1200px] w-full">
              <div class="flex justify-between items-center gap-4">
                <div class="flex flex-col justify-center items-start gap-4">
                  <div class="flex flex-col gap-1 text-[70px]! font-medium!">
                    <h1 class="text-[80px]! font-medium!">Hallo, ich bin</h1>
                    <h1 class="text-[80px]! font-medium!">{{ firstname + ' ' + lastname }}.</h1>
                  </div>
                  <h2 class="bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent text-2xl!">Frontend Developer & UI Designer</h2>
                  <span class="text-lg text-[var(--text-color-light)] max-w-[450px]">Ich entwickle moderne, benutzerfreundliche Websiten und digitale Applikationen mit Fokus auf sauberes Design und durchdachte Nutzererlebnisse.</span>

                  <div class="flex gap-3">
                    <button class="select-none hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] hover:bg-[var(--surface-color)] transition duration-75 border border-transparent flex justify-center items-center gap-2 px-4 py-3 rounded-xl shadow-md bg-[var(--primary-color)] text-[var(--text-color-white)]">
                      <span>Projekte ansehen</span>
                      <SvgStruct>
                        <i class="fa-solid fa-arrow-right"></i>
                      </SvgStruct>
                    </button>

                    <button class="select-none hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-75 flex justify-center items-center gap-2 px-4 py-3 rounded-xl shadow-sm text-[var(--text-color)] bg-[var(--surface-color)] border border-gray-200">
                      <SvgStruct>
                        <i class="fa-regular fa-envelope"></i>
                      </SvgStruct>
                      <span>Kontakt aufnehmen</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div class="select-none relative flex justify-center text-[80px] text-[var(--text-color-white)] font-extrabold items-center w-[400px] h-[400px] rounded-full shadow-2xl bg-linear-to-br from-[var(--primary-color)] to-[var(--secondary-color)] border-5 border-[var(--surface-color)]">
                    <div class="rotate -z-1 absolute box-content! top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full h-full p-3 bg-linear-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full"></div>
                    <span>{{ firstname.slice(0,1) + lastname.slice(0,1) }}</span>
                  </div>
                </div>
              </div>

              <div class="mt-5 flex gap-3">
                <button v-for="i in 3" :key="i" class="hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-75 min-w-[40px] min-h-[40px] rounded-xl shadow-sm border text-lg border-gray-200 text-gray-600">
                  <a href="#" target="_blank">
                    <SvgStruct>
                      <i class="fa-brands fa-github"></i>
                    </SvgStruct>
                  </a>
                </button>
              </div>
            </div>
          </header>

          <PublishModulStruct v-if="section.sectionType !== 'Hero Section' " :name="section.sectionType" :title="section.title" description="Eine Auswahl von Arbetien, an denen ich gearbeitet habe - von Web-Apps bis hin zu UI-Konzepten.">
            <div v-for="block in section.editorBlock" :key="block.id" class="flex flex-col gap-6">
              <div class="py-5 px-1" v-if="block.blockType === 'text' ">
                <PublishTextElement :text-block="block.textBlockContent"></PublishTextElement>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <PublishProjectElement v-for="project in block.project" :key="project.id" :title="project.title" :description="project.description" :demo-url="project.demoUrl" :code-url="project.githubUrl" image=""></PublishProjectElement>
              </div>

              <PublishSkillModul v-if="block.blockType === 'skill' " class="grid grid-cols-2 gap-x-10 gap-y-5">
                  <PublishSkillElement v-for="skill in block.skills" :key="skill.id" :title="skill.name" :value="skill.level"></PublishSkillElement>
              </PublishSkillModul>

              <div v-if="block.blockType === 'education' " class="flex flex-col gap-5">
                <PublishEducationElement v-for="education in block.education" :key="education.id" :institution-name="education.institutionName" :degree="education.degree" :start-date="education.startDate" :end-date="education.endDate"></PublishEducationElement>
              </div>

              <PublishLinkModul v-if="block.blockType === 'link' ">
                <div class="flex items-center justify-center gap-4">
                  <PublishLinkElement v-for="link in block.link" :key="link.id" :svg="getBrandSvg(link.platform)" :name="link.platform" :url="link.url"></PublishLinkElement>
                </div>
              </PublishLinkModul>
            </div>
          </PublishModulStruct>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
  .rotate{
    animation: rotate 5s linear infinite;
  }

  @keyframes rotate {
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
