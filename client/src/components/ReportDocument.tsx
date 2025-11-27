import { forwardRef } from 'react';
import { useUpload } from "@/context/UploadContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scan } from 'lucide-react';

// This component is designed to be rendered off-screen and captured for the PDF.
export const ReportDocument = forwardRef<HTMLDivElement>((_, ref) => {
  const { session } = useUpload();
  const { result, fileName, previewUrl } = session;

  if (!result) return null;

  return (
    <div ref={ref} className="bg-white text-gray-900 p-8" style={{ width: '210mm', minHeight: '297mm' }}>
      <header className="flex items-center justify-between pb-6 border-b-2 border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
            <Scan className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary">DentAge AI Report</h1>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p>Report Generated: {new Date().toLocaleDateString()}</p>
          <p>File: {fileName}</p>
        </div>
      </header>

      <main className="py-8">
        <section className="grid grid-cols-3 gap-8 mb-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Analysis Summary</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Estimated Dental Age</p>
                <p className="text-5xl font-bold text-primary">{result.estimatedAge}</p>
                <p className="text-md text-gray-600">years old</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Confidence Score</p>
                <p className="text-5xl font-bold text-primary">{result.confidence}%</p>
                <p className="text-md text-gray-600">Overall Confidence</p>
              </div>
            </div>
          </div>
          {previewUrl && (
            <div className="bg-gray-900 p-2 rounded-lg">
              <img src={previewUrl} alt="Dental X-ray" className="w-full h-auto object-contain rounded" />
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detailed Findings</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tooth-by-Tooth Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Tooth</th>
                      <th className="p-2">Demirjian Stage</th>
                      <th className="p-2">Used for Estimation</th>
                      <th className="p-2 text-right">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.analyzedTeeth.map((tooth, index) => (
                      <tr key={index} className="border-b last:border-none">
                        <td className="p-2 font-medium">{tooth.tooth}</td>
                        <td className="p-2">{tooth.stage}</td>
                        <td className="p-2">{tooth.usedForEstimation ? 'Yes' : 'No'}</td>
                        <td className="p-2 text-right font-semibold">{tooth.score}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Developmental Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {Object.entries(result.features).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b py-2">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="pt-6 mt-8 text-center text-xs text-gray-400 border-t-2 border-gray-200">
        <p>This is an AI-generated report and should be used for informational purposes only. Not for clinical use.</p>
        <p>&copy; {new Date().getFullYear()} DentAge AI. All rights reserved.</p>
      </footer>
    </div>
  );
});
