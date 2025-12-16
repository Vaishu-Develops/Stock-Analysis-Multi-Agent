from fpdf import FPDF
import datetime

class PDFReport(FPDF):
    def __init__(self, symbol):
        super().__init__()
        self.symbol = symbol
        self.set_auto_page_break(auto=True, margin=15)
        self.add_page()

    def header(self):
        # Logo or Title
        self.set_font('helvetica', 'B', 20)
        self.cell(0, 10, 'FinAgent.AI Report', align='C', new_x="LMARGIN", new_y="NEXT")
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

    def chapter_title(self, title):
        self.set_font('helvetica', 'B', 16)
        self.set_fill_color(200, 220, 255)
        self.cell(0, 10, title, fill=True, new_x="LMARGIN", new_y="NEXT")
        self.ln(4)

    def chapter_body(self, body):
        self.set_font('helvetica', '', 11)
        # Basic sanitization of unicode for standard fonts
        body = body.replace('₹', 'Rs. ').replace('â‚¹', 'Rs. ')
        self.multi_cell(0, 6, body)
        self.ln()
    
    def add_company_profile(self, profile, price_metrics):
        self.chapter_title(f"Company Profile: {self.symbol}")
        
        self.set_font('helvetica', 'B', 12)
        self.cell(40, 10, 'Company Name:')
        self.set_font('helvetica', '', 12)
        self.cell(0, 10, profile.get('company_name', 'N/A'), new_x="LMARGIN", new_y="NEXT")
        
        self.set_font('helvetica', 'B', 12)
        self.cell(40, 10, 'Sector:')
        self.set_font('helvetica', '', 12)
        self.cell(0, 10, f"{profile.get('sector', 'N/A')} - {profile.get('industry', 'N/A')}", new_x="LMARGIN", new_y="NEXT")
        
        self.set_font('helvetica', 'B', 12)
        self.cell(40, 10, 'Current Price:')
        self.set_font('helvetica', '', 12)
        currency = "Rs." if profile.get("currency") == "INR" else "$"
        price = price_metrics.get("current_price", 0)
        self.cell(0, 10, f"{currency} {price}", new_x="LMARGIN", new_y="NEXT")
        
        self.ln(5)
        self.set_font('helvetica', 'I', 10)
        desc = profile.get('description', '')
        if len(desc) > 500:
            desc = desc[:500] + "..."
        self.multi_cell(0, 5, desc)
        self.ln(10)

    def add_key_stats(self, fundamentals):
        self.chapter_title("Key Fundamentals")
        
        # Simple table-like structure
        stats = [
            ("P/E Ratio", str(fundamentals.get("pe_ratio", "N/A"))),
            ("Market Cap", str(fundamentals.get("market_cap", "N/A"))), # Note: Backend implementation of fetch_fundamentals likely puts raw numbers
            ("ROE", f"{fundamentals.get('roe', 0)*100:.2f}%" if fundamentals.get('roe') else "N/A"),
            ("Net Margin", f"{fundamentals.get('net_margin', 0)*100:.2f}%" if fundamentals.get('net_margin') else "N/A"),
        ]
        
        self.set_font('helvetica', '', 11)
        for label, value in stats:
            self.cell(50, 8, label, border=1)
            self.cell(50, 8, str(value), border=1, new_x="LMARGIN", new_y="NEXT")
        self.ln(10)

    def add_ai_report(self, report_text):
        self.chapter_title("Comprehensive AI Analysis")
        # Clean markdown marks for better PDF readability
        clean_text = report_text.replace('**', '').replace('## ', '').replace('### ', '')
        self.chapter_body(clean_text)

def generate_pdf_report(symbol, data):
    pdf = PDFReport(symbol)
    
    # Profile
    pdf.add_company_profile(data.get("profile", {}), data.get("price_metrics", {}))
    
    # Stats
    formatted_fundamentals = data.get("fundamentals", {})
    # Note: market_cap in fundamentals might be missing if it wasn't mapped, 
    # but it is in 'profile' usually as 'mktCap'. 
    # Let's fix that connection if needed or just rely on what's passed.
    
    pdf.add_key_stats(formatted_fundamentals)
    
    # Report
    if data.get("report_markdown"):
        pdf.add_ai_report(data.get("report_markdown"))
        
    return pdf
