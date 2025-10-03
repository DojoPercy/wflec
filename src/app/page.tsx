import AgendaHighlights from '@/component/agenda'
import TargetAudience from '@/component/audience'
import ObjectivesThemes from '@/component/executiveSection'
import Hero from '@/component/hero'
import ExpectedOutcomes from '@/component/outcomes'
import { KeyPillars } from '@/component/pillars'
import BoardSpeakers from '@/component/speakers'
import SponsorshipOpportunities from '@/component/sponsorship'
import Footer from '@/component/footer'
import React from 'react'

const page = () => {
  return (
    <>
    <Hero backgroundImage={'/files/bg.png'} logoSrc={'/files/logowhite.png'} />
    <KeyPillars/>
    <AgendaHighlights/>
    <ObjectivesThemes/>
    <TargetAudience/>
    <BoardSpeakers/>
    <ExpectedOutcomes/>
    <SponsorshipOpportunities/>
    <Footer/>
    </>
  )
}

export default page