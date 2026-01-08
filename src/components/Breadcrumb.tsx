import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation component
 * Displays hierarchical navigation path with clickable links
 */
function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-medium">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isTruncated = item.label.length > 30;
          const displayLabel = isTruncated
            ? `${item.label.substring(0, 27)}...`
            : item.label;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className="transition-colors hover:text-brand-red hover:underline"
                >
                  {displayLabel}
                </Link>
              ) : (
                <span
                  className={isLast ? 'font-medium text-gray-dark' : ''}
                  title={isTruncated ? item.label : undefined}
                >
                  {displayLabel}
                </span>
              )}
              {!isLast && (
                <span className="text-gray-light" aria-hidden="true">
                  {'>'}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
