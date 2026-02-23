import React, { useState } from 'react';

/**
 * NivoraFAQ - Minimal Accordion
 */
const NivoraFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "Are your diamonds certified?",
            answer: "Every diamond above 0.3ct comes with a GIA or IGI certificate. We guarantee conflict-free sourcing and full traceability of all our gemstones."
        },
        {
            question: "How do I find my ring size?",
            answer: "We include a complimentary ring sizer with your first order. You can also visit any BECANÉ boutique for a professional fitting, or use our online sizing guide."
        },
        {
            question: "How should I care for my jewellery?",
            answer: "Store pieces individually in the provided pouches. Avoid contact with perfumes and chemicals. We recommend professional cleaning every 6 months — free for BECANÉ pieces at any of our boutiques."
        },
        {
            question: "Do you offer custom or bespoke pieces?",
            answer: "Yes. Our master jewellers can create bespoke designs from concept to completion. Book a consultation through our Contact page — typical lead time is 6-8 weeks."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="section faq-section">
            <div className="container grid-2">
                <div className="faq-header">
                    <p className="text-eyebrow mb-4">Support</p>
                    <h2 className="text-h2">FREQUENTLY<br />ASKED<br />QUESTIONS</h2>
                </div>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="accordion-header">
                                {faq.question}
                                <span className="accordion-icon">+</span>
                            </div>
                            <div className="accordion-content">
                                <div className="accordion-body">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .faq-section {
                    padding: 10rem 0;
                    background: var(--bg-primary);
                }
                
                .faq-header {
                    position: sticky;
                    top: 100px;
                    height: fit-content;
                }

                .accordion-item {
                    cursor: pointer;
                }
            `}</style>
        </section>
    );
};

export default NivoraFAQ;
