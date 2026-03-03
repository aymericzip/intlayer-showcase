import { Container } from "@intlayer/design-system";
import { CircleCheck, Info } from "lucide-react";
import type { FC } from "react";

interface ScanRowProps {
	label: string;
	status: boolean;
	value?: string;
	info: string;
}

export const ScanRow: FC<ScanRowProps> = ({ label, status, value, info }) => (
	<Container
		className="flex items-center justify-between transition-all border-transparent hover:border-neutral/10"
		roundedSize="2xl"
		padding="sm"
		transparency="lg"
	>
		<div className="flex items-center gap-2">
			{status ? (
				<CircleCheck className="size-4 text-success" />
			) : (
				<Info className="size-4 text-neutral/20" />
			)}
			<span className="text-sm font-medium text-text/80">{label}</span>
			<div className="group relative">
				<Info className="size-3 text-neutral/20 cursor-help" />
				<div className="absolute bottom-full left-0 mb-2 w-56 p-2 bg-text text-text-opposite text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 shadow-xl border border-neutral/10">
					{info}
				</div>
			</div>
		</div>
		<Container
			roundedSize="xl"
			padding="sm"
			transparency="lg"
			className={`text-xs font-bold py-0.5 ${status ? "bg-success/10 text-success" : "bg-neutral/10 text-neutral"}`}
		>
			{value || (status ? "YES" : "NO")}
		</Container>
	</Container>
);
