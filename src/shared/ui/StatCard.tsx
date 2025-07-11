export interface StatCardProps {
    title : string;
    value : number | string;
    icon?: React.ReactNode;
    className?: string;
    description?: string;
}

export default function StatCard({title, value, icon, className, description} : StatCardProps) {
    return (
        <div
            className={"stat-card" + (className
            ? ` ${className}`
            : "")}>
            <div className="stat-card__header">
                {icon && <div className="stat-card__icon">{icon}</div>}
                <h4>{title}</h4>
            </div>
            <p className="stat-card__value">{value}</p>
            {description && <p className="stat-card__description">{description}</p>}
        </div>
    );
}
