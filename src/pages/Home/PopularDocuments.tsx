import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getPopularDocuments } from '../../lib/utils';
import { DocumentCard } from '../../components/documents/DocumentCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Button } from '../../components/ui/Button';

export const PopularDocuments: React.FC = () => {
  const popularDocs = getPopularDocuments();

  return (
    <section className="py-16 bg-smartdoc-slate-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Most Requested"
          title="Popular Documents"
          description="Direct access to verified services, processes, and eligibility criteria for the most essential public documents."
          action={
            <Button
              to="/documents"
              variant="outline"
              size="sm"
              rightIcon={ArrowRight}
              className="hidden sm:inline-flex"
            >
              View All Documents
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDocs.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button
            to="/documents"
            variant="outline"
            size="md"
            rightIcon={ArrowRight}
            className="w-full"
          >
            View All Documents
          </Button>
        </div>
      </div>
    </section>
  );
};
