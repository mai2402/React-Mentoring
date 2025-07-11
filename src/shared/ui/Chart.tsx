
export interface ChartProps {
    title: string;
    description?: string;
    className?: string;
    children: React.ReactNode;
}

export default function Chart({title,description,children,className}:ChartProps) {
    
     return (
    <div className={`chart-card ${className || ''}`}>
      <div className="chart-card__header">
        <h3 className="chart-card__title">{title}</h3>
        {description && <p className="chart-card__description">{description}</p>}
      </div>
      <div className="chart-card__body">
        {children}
      </div>
    </div>
  );
}