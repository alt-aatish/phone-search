export const Placeholder = ({
    width,
    height,
}: {
    width: string;
    height: string;
}) => (
    <div className={`relative overflow-hidden ${width} ${height} rounded bg-gray-300`}>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-placeholderwave"></div>
    </div>
);