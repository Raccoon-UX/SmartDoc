import React from 'react';
import { Category, CategoryId } from '../../types/category';
import { DocIcon } from '../ui/DocIcon';
import { cn } from '../../lib/utils';

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth',
        className
      )}
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              'inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap shrink-0 border select-none',
              isSelected
                ? 'bg-smartdoc-navy text-white border-smartdoc-navy shadow-sm'
                : 'bg-white text-smartdoc-slate-text border-smartdoc-slate-border hover:bg-smartdoc-slate-subtle hover:border-slate-300'
            )}
          >
            <DocIcon
              name={cat.iconName}
              className={cn(
                'w-4 h-4',
                isSelected ? 'text-blue-300' : 'text-smartdoc-slate-muted'
              )}
            />
            <span>{cat.name}</span>
            {typeof cat.count === 'number' && (
              <span
                className={cn(
                  'ml-0.5 text-[11px] px-1.5 py-0.2 rounded-full font-semibold',
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-smartdoc-slate-subtle text-smartdoc-slate-muted'
                )}
              >
                {cat.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
