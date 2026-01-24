import React, { useState } from 'react';

/**
 * NivoraFAQ - Minimal Accordion
 */
const NivoraFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship worldwide via DHL Express. All international orders are delivered within 3-5 business days."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unworn items in original packaging. Return shipping is free for orders over €500."
        },
        {
            question: "Are the materials sustainable?",
            answer: "Absolutely. We source organic cottons, recycled polyesters, and innovations like apple leather. Sustainability is at our core."
        },
        {
            question: "How do I care for my Becané pieces?",
            answer: "Most items are dry clean only to preserve their structure. Specific care instructions are included on the label of each garment."
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
