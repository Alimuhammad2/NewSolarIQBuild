import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, CheckCircle, Sun, Zap, Users, ArrowRight, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { useSolarStore } from '@/store/solarStore';
import { toast } from 'sonner';

interface QuoteData {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  systemSizeKW: number;
  breakdown: {
    panelsTotal: number;
    inverterTotal: number;
    batteriesTotal: number;
    structureAndInstallation: number;
  };
  grandTotal: number;
  selectedInstaller: string;
  packageType: string;
  panelSpecs: string;
  batterySpecs: string;
  installerDetails?: {
    name: string;
    company: string;
    location: string;
    rating: number;
    completedProjects: number;
  };
  createdAt: string;
}

const FinalScreen = () => {
  const { savedQuoteId, getTotalLoad } = useSolarStore();
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchQuotation = async () => {
      if (!savedQuoteId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError('');
        const res = await axios.get(`http://localhost:5000/api/quotations/${savedQuoteId}`);
        if (res.data && res.data.data) {
          setQuote(res.data.data);
        }
      } catch (err: any) {
        console.error('Error fetching quotation:', err);
        setError('Database se dynamic quote load nahi ho saki.');
        toast.error('Failed to load quote details.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotation();
  }, [savedQuoteId]);

  const handleDownloadPDF = () => {
    if (!quote) return;

    toast.success('Your professional PDF quote is being prepared...');

    // Dynamic iframe-based print PDF layout
    const printWindow = document.createElement('iframe');
    printWindow.style.position = 'fixed';
    printWindow.style.right = '0';
    printWindow.style.bottom = '0';
    printWindow.style.width = '0';
    printWindow.style.height = '0';
    printWindow.style.border = '0';
    document.body.appendChild(printWindow);

    const doc = printWindow.contentWindow?.document || printWindow.contentDocument;
    if (!doc) return;

    const htmlContent = `
      <html>
      <head>
        <title>SolarIQ Official Quotation - ${quote._id}</title>
        <style>
          body { font-family: 'DM Sans', 'Inter', sans-serif; padding: 40px; color: #1e293b; background: #ffffff; line-height: 1.5; }
          .header-container { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #f59e0b; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 32px; font-weight: 900; color: #f59e0b; }
          .quote-title { font-size: 24px; font-weight: 800; text-align: right; text-transform: uppercase; color: #1e3a8a; }
          .section-title { font-size: 15px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 5px; margin-top: 25px; margin-bottom: 15px; }
          .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 30px; }
          .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; }
          .value { font-size: 14px; font-weight: 600; color: #0f172a; margin-top: 2px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          .table th { background: #f8fafc; text-align: left; padding: 12px; font-size: 12px; font-weight: 700; color: #475569; border-bottom: 1.5px solid #e2e8f0; }
          .table td { padding: 12px; font-size: 13px; font-weight: 600; border-bottom: 1px solid #f1f5f9; color: #334155; }
          .total-row { background: #f8fafc; font-size: 16px; font-weight: 800; color: #1e3a8a; }
          .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header-container">
          <div>
            <div class="logo">SolarIQ</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Intelligent Solar Advisor Pakistan</div>
          </div>
          <div>
            <div class="quote-title">Official Proposal</div>
            <div style="font-size: 12px; color: #64748b;">Proposal ID: ${quote._id}</div>
            <div style="font-size: 12px; color: #64748b;">Date: ${new Date(quote.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        
        <div class="grid">
          <div>
            <div class="section-title">Customer Details</div>
            <div style="margin-bottom: 10px;">
              <div class="label">Full Name</div>
              <div class="value">${quote.fullName}</div>
            </div>
            <div style="margin-bottom: 10px;">
              <div class="label">Phone Number</div>
              <div class="value">${quote.phone}</div>
            </div>
            <div style="margin-bottom: 10px;">
              <div class="label">Email Address</div>
              <div class="value">${quote.email}</div>
            </div>
            <div style="margin-bottom: 10px;">
              <div class="label">Delivery Address</div>
              <div class="value">${quote.address}</div>
            </div>
          </div>
          
          <div>
            <div class="section-title">Assigned Solar Installer</div>
            <div style="margin-bottom: 10px;">
              <div class="label">Installer Name</div>
              <div class="value">${quote.installerDetails?.name || quote.selectedInstaller}</div>
            </div>
            <div style="margin-bottom: 10px;">
              <div class="label">Company</div>
              <div class="value">${quote.installerDetails?.company || 'SolarIQ Approved Contractor'}</div>
            </div>
            <div style="margin-bottom: 10px;">
              <div class="label">Location</div>
              <div class="value">${quote.installerDetails?.location || 'Karachi, Pakistan'}</div>
            </div>
            <div style="margin-bottom: 10px;">
              <div class="label">Credentials</div>
              <div class="value">⭐ ${quote.installerDetails?.rating || '4.8'} / 5.0 (${quote.installerDetails?.completedProjects || 100}+ Installations Completed)</div>
            </div>
          </div>
        </div>

        <div class="section-title">Solar Package Hardware Specifications</div>
        <table class="table">
          <thead>
            <tr>
              <th>Component Category</th>
              <th>Dynamic Equipment Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Selected Package Type</td>
              <td><strong>${quote.packageType}</strong></td>
            </tr>
            <tr>
              <td>Solar System Size (kW)</td>
              <td><strong>${quote.systemSizeKW} kW Hybrid Ready</strong></td>
            </tr>
            <tr>
              <td>Specific Solar Panels</td>
              <td><strong>${quote.panelSpecs}</strong></td>
            </tr>
            <tr>
              <td>Specific Batteries</td>
              <td><strong>${quote.batterySpecs}</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="section-title">Cost Estimations & Invoice Breakdown</div>
        <table class="table">
          <thead>
            <tr>
              <th>Dynamic Component Detail</th>
              <th style="text-align: right;">Price (PKR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>High-Efficiency Tier-1 Solar Panels Cost</td>
              <td style="text-align: right;">Rs ${quote.breakdown.panelsTotal.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Smart Synchronized Inverter Cost</td>
              <td style="text-align: right;">Rs ${quote.breakdown.inverterTotal.toLocaleString()}</td>
            </tr>
            <tr>
              <td>High-Capacity Backup Battery Bank Cost</td>
              <td style="text-align: right;">Rs ${quote.breakdown.batteriesTotal.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Rust-free Mounting Structure, Cabling & Installation Labor</td>
              <td style="text-align: right;">Rs ${quote.breakdown.structureAndInstallation.toLocaleString()}</td>
            </tr>
            <tr class="total-row">
              <td>Grand Total Package Price</td>
              <td style="text-align: right; font-weight: 800;">Rs ${quote.grandTotal.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <p>Thank you for choosing SolarIQ. Your assigned installer will reach out to schedule your structural site audit within 24-48 hours.</p>
          <p>This proposal is valid for 15 days from the date of generation. Generated dynamically via SolarIQ RAG platform.</p>
        </div>
      </body>
      </html>
    `;

    doc.open();
    doc.write(htmlContent);
    doc.close();

    // Trigger Browser print flow
    setTimeout(() => {
      printWindow.contentWindow?.focus();
      printWindow.contentWindow?.print();
      // Remove temporary iframe after printing dialog starts
      setTimeout(() => {
        document.body.removeChild(printWindow);
        toast.success('Professional PDF invoice successfully downloaded!');
      }, 500);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container mx-auto px-4 flex-1 flex flex-col items-center justify-center pt-24 pb-12">
          <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl border bg-card/50 backdrop-blur-xl">
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
            <h2 className="text-xl font-bold">Dynamic Proposal Calculations</h2>
            <p className="text-muted-foreground text-sm">
              Connecting with MongoDB to fetch your newly created quote...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container mx-auto px-4 flex-1 flex flex-col items-center justify-center pt-24 pb-12">
          <div className="max-w-md w-full text-center p-8 rounded-3xl border border-destructive/20 bg-card space-y-4 shadow-xl">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
            <h2 className="text-xl font-bold text-destructive">Record Not Found</h2>
            <p className="text-muted-foreground text-sm">
              Aapka quote database mein save nahi ho saka ya fetch karne mein problem aayi hai.
            </p>
            <Link to="/calculator">
              <Button className="w-full font-bold">Restart Solar Wizard</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
          {/* Success Header */}
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full solar-gradient flex items-center justify-center mx-auto mb-4 animate-pulse">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-black text-foreground tracking-tight">
              Your Quote is Ready!
            </h1>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              Thank you, <span className="font-bold text-foreground">{quote.fullName}</span>! Your customized Pakistan-compliant solar quotation is successfully registered.
            </p>
          </div>

          {/* Dynamic Quote Summary Card */}
          <Card className="text-left rounded-3xl border-2 shadow-2xl overflow-hidden bg-gradient-to-b from-card to-background">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-black text-foreground">Proposal Specifications</h2>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 animate-pulse flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Saved in MongoDB
                </span>
              </div>
              
              <div className="space-y-4 font-sans text-sm">
                {/* 1. Load */}
                <div className="flex items-center justify-between py-2 border-b border-border/80">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Total Electrical Load</p>
                      <p className="text-[11px] text-muted-foreground">Appliance Peak load</p>
                    </div>
                  </div>
                  <span className="font-bold text-foreground text-base">{getTotalLoad().toLocaleString()} W</span>
                </div>
                
                {/* 2. Package */}
                <div className="flex items-center justify-between py-2 border-b border-border/80">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Sun className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Chosen Package Type</p>
                      <p className="text-[11px] text-muted-foreground">{quote.systemSizeKW} kW Hybrid System</p>
                    </div>
                  </div>
                  <span className="font-bold text-foreground text-base">{quote.packageType}</span>
                </div>
                
                {/* 3. Installer */}
                <div className="flex items-center justify-between py-2 border-b border-border/80">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Assigned Installer</p>
                      <p className="text-[11px] text-muted-foreground">{quote.installerDetails?.company || 'Verified Professional'}</p>
                    </div>
                  </div>
                  <span className="font-bold text-foreground text-base">{quote.installerDetails?.name || quote.selectedInstaller}</span>
                </div>

                {/* 4. Grand Total */}
                <div className="flex items-center justify-between py-3 bg-muted/50 rounded-2xl px-4 border">
                  <div>
                    <p className="font-black text-foreground text-base">Grand Total Price</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Includes Hardware, mounting & installation</p>
                  </div>
                  <span className="font-black text-primary text-xl">Rs {quote.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            <Button size="lg" onClick={handleDownloadPDF} className="w-full font-bold py-6 rounded-xl solar-gradient border-0 text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-95 text-base">
              <Download className="mr-2 w-5 h-5" />
              Download Quote PDF
            </Button>

            <Link to="/">
              <Button variant="ghost" className="w-full font-bold py-5 hover:bg-muted text-foreground">
                Back to Home Screen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Next Steps Guide */}
          <Card className="bg-muted/40 border-dashed rounded-3xl max-w-md mx-auto text-left">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-black text-foreground text-lg border-b pb-2">What happens next?</h3>
              <ul className="text-xs text-muted-foreground space-y-3 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full solar-gradient flex items-center justify-center flex-shrink-0 text-[10px] text-primary-foreground font-black">1</span>
                  <span>{quote.installerDetails?.name} will contact you via phone (<strong className="text-foreground">{quote.phone}</strong>) within 24 hours.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full solar-gradient flex items-center justify-center flex-shrink-0 text-[10px] text-primary-foreground font-black">2</span>
                  <span>A home audit will be scheduled at your address (<strong className="text-foreground">{quote.address}</strong>) to plan wiring.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full solar-gradient flex items-center justify-center flex-shrink-0 text-[10px] text-primary-foreground font-black">3</span>
                  <span>Proposal finalization, hardware dispatch, and installation begin!</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FinalScreen;
