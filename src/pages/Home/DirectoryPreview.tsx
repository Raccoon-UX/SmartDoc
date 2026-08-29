import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getAllDocuments } from '../../lib/utils';
import { DocumentCard } from '../../components/documents/DocumentCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Button } from '../../components/ui/Button';

export const DirectoryPreview: React.FC = () => {
  const documents = getAllDocuments().slice(0, 6);

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-smartdoc-slate-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Document Catalog"
          title="Explore Document Services"
          description="Browse our curated index of standard identity, travel, financial, and civic document lifecycles."
          action={
            <Button
              to="/documents"
              variant="primary"
              size="md"
              rightIcon={ArrowRight}
              className="hidden sm:inline-flex"
            >
              View All Documents
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            to="/documents"
            variant="navy"
            size="lg"
            rightIcon={ArrowRight}
            className="w-full sm:w-auto shadow-card"
          >
            Explore Complete Document Directory
          </Button>
        </div>
      </div>
    </section>
  );
};
