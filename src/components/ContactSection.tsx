import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ContactBg from '@/assets/ContactImg.webp'
import { bodySmFlat, color, displayMd, titleMd } from '@/theme'
import { SlideReveal } from '@/components/SlideReveal'
import { useMediaQuery } from '@/components/useMediaQuery'

interface ContactSectionProps {
  image?: string
  email?: string
  phone?: string
  social?: string
  blurb?: string
}

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 240vh;
  background-color: ${color.cream};

  @media (max-width: 900px) {
    height: auto;
  }
`

const Stage = styled.div`
  position: sticky;
  top: 0;
  height: calc(100vh - var(--footer-h, 56px));
  height: calc(100svh - var(--footer-h, 56px));
  width: 100%;
  overflow: hidden;
  container-type: inline-size;

  @media (max-width: 900px) {
    position: static;
    height: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 7rem;
  }
`

const Photo = styled.div`
  position: absolute;
  overflow: hidden;
  will-change: width, height;

  @media (max-width: 900px) {
    position: relative;
    right: auto !important;
    bottom: auto !important;
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 16 / 10;
    order: 1;
    margin-top: 14rem;
  }
`

const PhotoReveal = styled(SlideReveal)`
  width: 100%;
  height: 100%;

  > div {
    width: 100%;
    height: 100%;
  }
`

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const Details = styled.div`
  position: absolute;
  top: 18%;
  left: 14.5%;
  right: 14.5%;
  z-index: 2;
  display: flex;
  gap: 7cqw;

  @media (max-width: 900px) {
    position: static;
    flex-direction: column;
    gap: 1.5rem;
    order: 3;
    padding: 10rem 14% 0 22%;
    color: ${color.ink};
    transform: none !important;
  }
`

const Mask = styled.div`
  overflow: hidden;
  padding: 1px;
  margin: -1px;
`

const Reveal = styled.div<{ $active: boolean; $index: number }>`
  transform: translate3d(0, ${(props) => (props.$active ? '0' : '120%')}, 0);
  transition: transform 1.4s cubic-bezier(0.19, 1, 0.22, 1);
  transition-delay: ${(props) => props.$index * 0.12}s;
  will-change: transform;

  @media (max-width: 900px) {
    transform: none;
  }
`

const DetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6cqw;
  max-width: max(23cqw, 40ch);

  @media (max-width: 900px) {
    max-width: none;
    gap: 1.25rem;
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2cqw;
`

const Label = styled.span`
  ${bodySmFlat};
  font-weight: 300;
  text-transform: uppercase;
`

const Value = styled.span`
  ${bodySmFlat};
  font-weight: 400;
`

const Blurb = styled.p`
  ${bodySmFlat};
  line-height: 1.4;
  text-transform: uppercase;
  max-width: 40ch;
  text-wrap: balance;
`

const Extras = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;

  @media (max-width: 900px) {
    position: static;
    order: 2;
    pointer-events: auto;
  }
`

const WorkHeading = styled.div`
  position: absolute;
  left: 27.4%;
  top: 56.2%;
  display: flex;
  align-items: center;
  gap: 1cqw;
  color: ${color.cream};

  @media (max-width: 900px) {
    position: static;
    justify-content: flex-start;
    padding: 7rem calc(20% - 1.5rem) 0 1.5rem;
    color: ${color.ink};
  }
`

const WorkWord = styled.span`
  ${displayMd};
  white-space: nowrap;
`

const WorkRule = styled.span`
  width: clamp(40px, 4.8cqw, 83px);
  height: 1px;
  background-color: currentColor;
`

const Form = styled.form`
  position: absolute;
  left: 27.4%;
  right: 22%;
  top: 60.7%;
  display: flex;
  flex-direction: column;
  pointer-events: auto;

  @media (max-width: 900px) {
    position: static;
    padding: 2rem calc(20% - 1.5rem) 0 1.5rem;
  }
`

const FieldLabel = styled.label`
  ${titleMd};
  font-weight: 500;
  color: ${color.cream};

  small {
    font-size: 0.8em;
    font-weight: 300;
    text-transform: none;
  }

  @media (max-width: 900px) {
    color: ${color.ink};
  }
`

const Input = styled.input`
  width: 100%;
  margin-top: 9vh;
  background: none;
  border: none;
  border-bottom: 1px solid ${color.cream};
  padding: 0.6cqw 0;
  ${titleMd};
  text-transform: none;
  color: ${color.cream};
  outline: none;

  @media (max-width: 900px) {
    margin-top: 0.75rem;
    border-bottom-color: ${color.ink};
    color: ${color.ink};
    padding: 0.5rem 0;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  margin-top: 9vh;
  background: none;
  border: none;
  border-bottom: 1px solid ${color.cream};
  padding: 0.6cqw 0;
  ${titleMd};
  text-transform: none;
  color: ${color.cream};
  outline: none;
  resize: none;
  min-height: 4.5em;
  line-height: 1.5;

  @media (max-width: 900px) {
    margin-top: 0.75rem;
    border-bottom-color: ${color.ink};
    color: ${color.ink};
    padding: 0.5rem 0;
  }
`

const NoteSlot = styled.div`
  position: relative;
  height: 0;
`

const LimitNote = styled.p`
  ${bodySmFlat};
  position: absolute;
  top: 1.2vh;
  left: 0;
  right: 0;
  color: ${color.danger};
`

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 39%;
  margin-top: 9vh;

  @media (max-width: 900px) {
    padding-left: 0;
    margin-top: 2rem;
  }
`

const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4cqw;
`

const Dot = styled.span<{ $active?: boolean }>`
  width: clamp(7px, 0.58cqw, 10px);
  height: clamp(7px, 0.58cqw, 10px);
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? color.cream : color.sage)};

  @media (max-width: 900px) {
    background-color: ${(props) => (props.$active ? color.ink : color.sage)};
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1cqw;

  @media (max-width: 900px) {
    gap: 0.75rem;
  }
`

const Submit = styled.button`
  ${titleMd};
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  color: #ffffff;
  background-color: ${color.sage};
  border: 1px solid ${color.sage};
  border-radius: 2.5px;
  padding: 0.6cqw 2.2cqw;
  cursor: pointer;
  transition:
    opacity 0.25s ease,
    background-color 0.25s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 900px) {
    padding: 0.6rem 1.6rem;
  }
`

const StatusNote = styled.p`
  ${bodySmFlat};
  margin-top: 1.2vh;
  color: ${color.cream};

  @media (max-width: 900px) {
    color: ${color.ink};
  }
`

const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
`

const Back = styled(Submit)`
  color: ${color.cream};
  background-color: transparent;
  border-color: ${color.cream};

  @media (max-width: 900px) {
    color: ${color.ink};
    border-color: ${color.ink};
  }
`

interface FormStep {
  id: string
  label: string
  type: string
  autoComplete?: string
  maxLength?: number
  multiline?: boolean
  optional?: boolean
}

const FORM_STEPS: FormStep[] = [
  { id: 'name', label: 'Name / Company', type: 'text', autoComplete: 'name', maxLength: 100 },
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email', maxLength: 100 },
  { id: 'phone', label: 'Phone Number', type: 'tel', autoComplete: 'tel', optional: true },
  { id: 'details', label: 'Details', type: 'text', maxLength: 500, multiline: true },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? '/api/contact'

const RIGHT_INSET = 0.9
const DETAILS_DROP = 240
const START = { width: 34, height: 40 }
const END = { width: 98.3 }

const ContactSection = ({
  image = ContactBg,
  email = 'hello@buenosdiaznyc.com',
  social = '@Buenosdiaznyc',
  blurb = 'We’d love to learn more about your event and create something special together.',
}: ContactSectionProps) => {
  const wrapperRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const extrasRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const isStacked = useMediaQuery('(max-width: 900px)')
  const honeypotRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const hasMountedRef = useRef(false)

  const currentStep = FORM_STEPS[step]
  const currentValue = answers[currentStep.id] ?? ''
  const isPhone = currentStep.id === 'phone'
  const isEmail = currentStep.id === 'email'
  const limit = currentStep.maxLength
  const atLimit = limit !== undefined && currentValue.length >= limit
  const emailInvalid = isEmail && currentValue.length > 0 && !EMAIL_PATTERN.test(currentValue)
  const phoneDigits = currentValue.replace(/\D/g, '').length
  const canAdvance =
    !atLimit &&
    (isPhone
      ? phoneDigits === 0 || phoneDigits === 10
      : isEmail
        ? EMAIL_PATTERN.test(currentValue)
        : currentValue.trim().length > 0)
  const isLastStep = step === FORM_STEPS.length - 1

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const raw = event.target.value
    const next = currentStep.id === 'phone' ? formatPhone(raw) : raw
    setAnswers((prev) => ({ ...prev, [currentStep.id]: next }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!canAdvance || status === 'sending') return

    if (!isLastStep) {
      setStep((value) => value + 1)
      return
    }

    if (honeypotRef.current?.checked) return

    setStatus('sending')

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...answers,
          botcheck: honeypotRef.current?.checked ?? false,
        }),
      })

      if (!response.ok) throw new Error('Request failed')

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const handleBack = () => {
    if (status === 'sending') return
    setStep((value) => Math.max(value - 1, 0))
  }

  const isSending = status === 'sending'
  const isSuccess = status === 'success'

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }
    inputRef.current?.focus({ preventScroll: true })
  }, [step])

  useEffect(() => {
    const details = detailsRef.current
    if (!details) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(details)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    if (isStacked) {
      const photo = photoRef.current
      const details = detailsRef.current
      const extras = extrasRef.current

      if (photo) {
        photo.style.width = ''
        photo.style.height = ''
        photo.style.right = ''
        photo.style.bottom = ''
      }
      if (details) {
        details.style.color = ''
        details.style.transform = ''
      }
      if (extras) extras.style.opacity = ''

      setProgress(1)
      return
    }

    let raf = 0
    let current = 0
    let target = 0

    const measure = () => {
      const rect = wrapper.getBoundingClientRect()
      const travel = Math.max(rect.height - window.innerHeight, 1)
      target = clamp(-rect.top / travel)
    }

    const apply = (t: number) => {
      const photo = photoRef.current
      const details = detailsRef.current
      const extras = extrasRef.current
      if (!photo || !details || !extras) return

      const stage = photo.parentElement
      const stageHeight = stage ? stage.clientHeight : window.innerHeight
      const footerHeight =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--footer-h')) || 56
      const endTop = (footerHeight / stageHeight) * 100
      const endHeight = 100 - endTop

      photo.style.right = `${RIGHT_INSET}%`
      photo.style.bottom = '0'
      photo.style.width = `${lerp(START.width, END.width, t)}%`
      photo.style.height = `${lerp(START.height, endHeight, t)}%`

      const tone = clamp((t - 0.35) / 0.3)
      const channel = Math.round(lerp(30, 255, tone))
      details.style.color = `rgb(${channel}, ${channel}, ${channel})`

      details.style.transform = `translateY(${lerp(DETAILS_DROP, 0, t)}px)`

      extras.style.opacity = `${clamp((t - 0.6) / 0.25)}`
    }

    const tick = () => {
      current += (target - current) * 0.14
      apply(current)
      setProgress(current)
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => measure()

    measure()
    current = target
    apply(current)
    raf = requestAnimationFrame(tick)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isStacked])

  return (
    <Wrapper ref={wrapperRef} data-testid='contact-section'>
      <Stage>
        <Photo ref={photoRef}>
          <PhotoReveal>
            <PhotoImage src={image} alt='' aria-hidden='true' loading='lazy' decoding='async' />
          </PhotoReveal>
        </Photo>

        <Details ref={detailsRef}>
          <Mask>
            <Reveal $active={revealed} $index={0}>
              <DetailColumn>
                <Field>
                  <Label>Email:</Label>
                  <Value>{email}</Value>
                </Field>
                <Field>
                  <Label>Socials:</Label>
                  <Value>{social}</Value>
                </Field>
              </DetailColumn>
            </Reveal>
          </Mask>

          <Mask>
            <Reveal $active={revealed} $index={1}>
              <DetailColumn>
                <Field aria-hidden='true' style={{ visibility: 'hidden' }}>
                  <Label>&nbsp;</Label>
                  <Value>&nbsp;</Value>
                </Field>
                <Blurb>{blurb}</Blurb>
              </DetailColumn>
            </Reveal>
          </Mask>
        </Details>

        <Extras
          ref={extrasRef}
          style={isStacked ? undefined : { opacity: progress > 0.6 ? undefined : 0 }}
        >
          <WorkHeading>
            <WorkWord>Work</WorkWord>
            <WorkRule />
            <WorkWord>With Us</WorkWord>
          </WorkHeading>

          <Form onSubmit={handleSubmit}>
            <FieldLabel htmlFor={`contact-${currentStep.id}`}>
              {isSuccess ? 'Thank you' : currentStep.label}
              {!isSuccess && <small> {currentStep.optional ? '(optional)' : '(required)'}</small>}
            </FieldLabel>

            {isSuccess ? (
              <StatusNote>
                Your inquiry is on its way. We will follow up at {answers.email} shortly.
              </StatusNote>
            ) : (
              <>
                {currentStep.multiline ? (
                  <TextArea
                    id={`contact-${currentStep.id}`}
                    key={currentStep.id}
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    name={currentStep.id}
                    rows={3}
                    maxLength={currentStep.maxLength}
                    value={currentValue}
                    onChange={handleChange}
                    disabled={isSending}
                  />
                ) : (
                  <Input
                    id={`contact-${currentStep.id}`}
                    key={currentStep.id}
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    name={currentStep.id}
                    type={currentStep.type}
                    autoComplete={currentStep.autoComplete}
                    inputMode={isPhone ? 'numeric' : undefined}
                    maxLength={currentStep.maxLength}
                    value={currentValue}
                    onChange={handleChange}
                    disabled={isSending}
                  />
                )}

                <NoteSlot aria-live='polite'>
                  {atLimit && limit !== undefined && (
                    <LimitNote>Maximum {limit} characters.</LimitNote>
                  )}
                  {!atLimit && emailInvalid && <LimitNote>Enter a valid email address.</LimitNote>}
                  {!atLimit && !emailInvalid && status === 'error' && (
                    <LimitNote>Something went wrong. Please try again or email {email}.</LimitNote>
                  )}
                </NoteSlot>

                <Honeypot
                  ref={honeypotRef}
                  type='checkbox'
                  name='botcheck'
                  tabIndex={-1}
                  autoComplete='off'
                />
              </>
            )}

            <FormFooter>
              <Dots>
                {FORM_STEPS.map((formStep, index) => (
                  <Dot key={formStep.id} $active={index === step} />
                ))}
              </Dots>
              {!isSuccess && (
                <Actions>
                  {step > 0 && (
                    <Back type='button' onClick={handleBack} disabled={isSending}>
                      Back
                    </Back>
                  )}
                  <Submit type='submit' disabled={!canAdvance || isSending}>
                    {isSending ? 'Sending' : isLastStep ? 'Submit' : 'Next'}
                  </Submit>
                </Actions>
              )}
            </FormFooter>
          </Form>
        </Extras>
      </Stage>
    </Wrapper>
  )
}

export default ContactSection
