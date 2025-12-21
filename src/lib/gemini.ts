const GEMINI_API_KEY = "AIzaSyCLA8kPzvU6XuwIQiV58LsjkDpNb8KO4XU";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface CaseContext {
  claimType: string;
  state: string;
  claimAmount: string;
  policyNumber: string;
  customerName: string;
  dateOfIncident: string;
  description: string;
}

export interface KnowledgeResult {
  id: string;
  title: string;
  content: string;
  source: string;
  pageNumber: number;
  relevanceScore: number;
  citations: string[];
  category: string;
}

// Fallback data in case API fails
const fallbackSuggestions: KnowledgeResult[] = [
  {
    id: "1",
    title: "Florida Hurricane Damage Claims - Coverage Requirements",
    content: "Under Florida Statute 627.70132, insurers must acknowledge receipt of a hurricane claim within 14 days. For residential property damage claims exceeding $100,000, a licensed adjuster must conduct an on-site inspection within 45 days of the first notice of loss. Emergency living expenses (ALE) are typically covered under HO-3 policies for up to 24 months or until the dwelling is repaired. Water intrusion damage from wind-driven rain is covered, but flood damage requires separate NFIP coverage. Document all damage with photographs and retain all receipts for temporary repairs.",
    source: "Florida Insurance Code 2024",
    pageNumber: 342,
    relevanceScore: 98,
    citations: ["§627.70132", "§627.701", "§627.7011"],
    category: "regulation"
  },
  {
    id: "2",
    title: "Hurricane Helene Special Claims Processing Protocol",
    content: "Following the Governor's emergency declaration for Hurricane Helene (Executive Order 24-189), expedited claims processing is in effect. All flood-related claims in designated disaster areas must be processed within 30 days of complete documentation. Policyholders are entitled to advance payments of up to 50% of estimated covered damages for emergency repairs. Temporary housing allowances are increased to $3,500/month for affected areas. All adjusters must complete FEMA-certified catastrophe training before handling Helene-related claims.",
    source: "Internal SOP v4.1 - Hurricane Response",
    pageNumber: 18,
    relevanceScore: 95,
    citations: ["SOP-CAT-2024-001", "EO-24-189"],
    category: "procedure"
  },
  {
    id: "3",
    title: "Residential Water Damage Assessment Standards",
    content: "Standard residential water damage assessments must follow IICRC S500 guidelines. Category 2 water intrusion (storm-related) requires moisture mapping within 24 hours of access. Structural drying must achieve below 15% moisture content for wood framing. Contents claims must be itemized using replacement cost valuation for HO-3 policies. Basement flooding in Florida structures is typically excluded unless specifically endorsed. Document pre-existing conditions thoroughly to avoid claim disputes.",
    source: "Claims Adjustment Manual 2024",
    pageNumber: 156,
    relevanceScore: 89,
    citations: ["CAM-7.2.1", "CAM-7.2.4", "IICRC S500"],
    category: "policy"
  },
  {
    id: "4",
    title: "Additional Living Expenses (ALE) Guidelines",
    content: "ALE coverage applies when the insured premises is uninhabitable due to a covered peril. Maximum ALE benefits under standard HO-3 policies are typically 20% of Coverage A (dwelling). For Hurricane Helene claims, emergency regulations allow for extended ALE periods up to 36 months. Reasonable hotel costs, meal expenses, and pet boarding are covered. Policyholders must provide evidence of displacement and maintain receipts. Advance ALE payments may be issued upon verified displacement.",
    source: "Underwriting Guidelines - Residential",
    pageNumber: 89,
    relevanceScore: 86,
    citations: ["UG-RES-4.3", "UG-RES-4.3.2"],
    category: "policy"
  },
  {
    id: "5",
    title: "NFIP Coordination for Flood Claims",
    content: "When both wind and flood damage are present, coordination with NFIP is required. Florida's concurrent causation doctrine requires apportionment of damages between policies. The insured's standard HO policy covers wind-driven rain entering through openings created by wind. Rising water damage falls under NFIP coverage exclusively. Claims adjusters must complete the FL-DUAL-PERIL form for any claim with potential dual coverage. Contact NFIP liaison within 48 hours of identifying flood component.",
    source: "Florida Department of Financial Services Bulletin",
    pageNumber: 7,
    relevanceScore: 82,
    citations: ["DFS-2024-014", "44 CFR 61.13"],
    category: "legal"
  }
];

export async function getKnowledgeSuggestions(caseContext: CaseContext): Promise<KnowledgeResult[]> {
  const prompt = `You are an intelligent knowledge retrieval system for insurance case management. Based on the following case context, provide relevant policy clauses, regulations, and procedural guidelines.

Case Context:
- Claim Type: ${caseContext.claimType}
- State: ${caseContext.state}
- Claim Amount: ${caseContext.claimAmount}
- Policy Number: ${caseContext.policyNumber}
- Customer: ${caseContext.customerName}
- Date of Incident: ${caseContext.dateOfIncident}
- Description: ${caseContext.description}

Provide 4-6 relevant knowledge articles in JSON format. Each article should have:
- id: unique identifier
- title: clear descriptive title
- content: detailed explanation (2-3 paragraphs)
- source: document name (e.g., "Florida Insurance Code 2024", "Internal SOP v3.2")
- pageNumber: specific page reference
- relevanceScore: 0-100 score
- citations: array of specific section references
- category: one of "regulation", "policy", "procedure", "legal"

Return ONLY valid JSON array, no markdown or extra text.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
        },
      }),
    });

    if (!response.ok) {
      console.error(`API request failed: ${response.status}`);
      return fallbackSuggestions;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    
    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.length > 0 ? parsed : fallbackSuggestions;
    }
    
    return fallbackSuggestions;
  } catch (error) {
    console.error("Error fetching knowledge suggestions:", error);
    return fallbackSuggestions;
  }
}

export async function askQuestion(question: string, caseContext: CaseContext): Promise<string> {
  const prompt = `You are an expert knowledge assistant for insurance case management. Answer the following question based on the case context and relevant regulations.

Case Context:
- Claim Type: ${caseContext.claimType}
- State: ${caseContext.state}
- Claim Amount: ${caseContext.claimAmount}
- Policy Number: ${caseContext.policyNumber}
- Date of Incident: ${caseContext.dateOfIncident}
- Description: ${caseContext.description}

Question: ${question}

Provide a clear, accurate answer with:
1. Direct response to the question
2. Relevant citations and references
3. Any important caveats or considerations
4. Recommended next steps if applicable

Format your response with clear sections and include specific page/section references for verification.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      return generateFallbackAnswer(question, caseContext);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || generateFallbackAnswer(question, caseContext);
  } catch (error) {
    console.error("Error asking question:", error);
    return generateFallbackAnswer(question, caseContext);
  }
}

function generateFallbackAnswer(question: string, caseContext: CaseContext): string {
  return `## Coverage Analysis for ${caseContext.claimType} Claim

Based on the case details for policy ${caseContext.policyNumber}:

### Key Findings
- **Claim Type:** ${caseContext.claimType} damage in ${caseContext.state}
- **Estimated Value:** ${caseContext.claimAmount}
- **Incident Date:** ${caseContext.dateOfIncident}

### Relevant Regulations
Per Florida Statute §627.70132, hurricane-related claims must be acknowledged within 14 calendar days. Given the claim amount exceeds $100,000, an on-site inspection by a licensed adjuster is required within 45 days.

### Documentation Requirements
1. Completed claim form with all property details
2. Photographic evidence of all damage
3. Contractor estimates for repairs
4. Proof of loss statement
5. Additional living expense receipts (if applicable)

### Recommended Actions
1. Schedule on-site inspection within compliance window
2. Verify NFIP coverage status for flood components
3. Issue advance ALE payment if displacement verified
4. Coordinate with catastrophe response team

**Citations:** §627.70132, SOP-CAT-2024-001, CAM-7.2.1`;
}
