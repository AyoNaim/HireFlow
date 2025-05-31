'use server'

export const generateSummary = async (prompt: string) => {
    const OPENROUTER_API_KEY='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';
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 512,
        })
    });

    if (!response.ok) {
        throw new Error('AI request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
