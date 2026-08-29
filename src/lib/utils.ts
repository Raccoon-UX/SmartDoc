import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { documents } from '../data/documents';
import { services } from '../data/services';
import { categories } from '../data/categories';
import { Document } from '../types/document';
import { Service } from '../types/service';
import { Category, CategoryId } from '../types/category';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- DATA ACCESS HELPERS ---

export function getAllDocuments(): Document[] {
  return documents;
}

export function getDocumentById(id: string): Document | undefined {
  return documents.find((doc) => doc.id.toLowerCase() === id.toLowerCase());
}

export function getPopularDocuments(): Document[] {
  return documents.filter((doc) => doc.isPopular);
}

export function getDocumentsByCategory(categoryId: CategoryId): Document[] {
  if (categoryId === 'all') return documents;
  return documents.filter((doc) => doc.category === categoryId);
}

export function getAllServices(): Service[] {
  return services;
}

export function getServiceById(id: string): Service | undefined {
  return services.find((srv) => srv.id.toLowerCase() === id.toLowerCase());
}

export function getServicesForDocument(documentId: string): Service[] {
  return services.filter((srv) => srv.documentId.toLowerCase() === documentId.toLowerCase());
}

export function getRelatedDocuments(documentId: string): Document[] {
  const currentDoc = getDocumentById(documentId);
  if (!currentDoc || !currentDoc.relatedDocumentIds) return [];
  return documents.filter((doc) => currentDoc.relatedDocumentIds.includes(doc.id));
}

export function getAllCategories(): Category[] {
  return categories.map((cat) => {
    if (cat.id === 'all') {
      return { ...cat, count: documents.length };
    }
    const count = documents.filter((d) => d.category === cat.id).length;
    return { ...cat, count };
  });
}

export function searchDocuments(query: string, categoryId?: CategoryId): Document[] {
  const trimmed = query.trim().toLowerCase();
  let baseDocs = documents;

  if (categoryId && categoryId !== 'all') {
    baseDocs = baseDocs.filter((d) => d.category === categoryId);
  }

  if (!trimmed) {
    return baseDocs;
  }

  return baseDocs.filter((doc) => {
    const nameMatch = doc.name.toLowerCase().includes(trimmed);
    const codeMatch = doc.code.toLowerCase().includes(trimmed);
    const descMatch = doc.shortDescription.toLowerCase().includes(trimmed);
    const authMatch = doc.issuingAuthority.toLowerCase().includes(trimmed);
    const usesMatch = doc.keyUses.some((use) => use.toLowerCase().includes(trimmed));

    // Check if any service names match
    const docServices = getServicesForDocument(doc.id);
    const serviceMatch = docServices.some(
      (s) =>
        s.name.toLowerCase().includes(trimmed) ||
        s.shortDescription.toLowerCase().includes(trimmed) ||
        s.purpose.toLowerCase().includes(trimmed)
    );

    return nameMatch || codeMatch || descMatch || authMatch || usesMatch || serviceMatch;
  });
}
