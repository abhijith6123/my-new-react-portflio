import { Timeline } from '../components/Timeline'
import { experiences } from '../constants'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Experience = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });

  return (
    <section
      ref={sectionRef}
      id="work"
      className={`c-space mt-20 mb-20 scroll-reveal-scale ${isVisible ? 'visible' : ''}`}
    >
        <h2 className="text-heading mb-12">My Experience</h2>
        <Timeline data={experiences}/>
    </section>
  )
}

export default Experience