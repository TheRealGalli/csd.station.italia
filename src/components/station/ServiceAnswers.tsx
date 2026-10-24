import { ChevronDown } from 'lucide-react';
import { consultingFaq, leadFaq, mediaFaq, nfcFaq, trainingFaq, webFaq } from '@/seo/content';
import type { ServiceMode } from '@/seo/routes';

export function ServiceAnswers({ mode }: { mode: ServiceMode }) {
  const questions = mode === 'lead' ? leadFaq : mode === 'nfc' ? nfcFaq : mode === 'web' ? webFaq : mode === 'media' ? mediaFaq : mode === 'training' ? trainingFaq : consultingFaq;
  return <div className="service-answers">{questions.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18}/></summary><p>{answer}</p></details>)}</div>;
}
