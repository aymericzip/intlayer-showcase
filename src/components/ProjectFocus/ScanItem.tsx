import { Container } from "@intlayer/design-system";
import { Info } from "lucide-react";
import type { FC, ReactNode } from "react";

interface ScanItemProps {
	icon: ReactNode;
	label: string;
	value: string;
	info: string;
	success?: boolean;
}

export const ScanItem: FC<ScanItemProps> = ({
	icon,
	label,
	value,
	info,
	success,
}) => (
	<Container
		className="flex flex-col transition-all shadow-sm"
		roundedSize="2xl"
		padding="md"
		gap="sm"
		transparency="lg"
	>
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2 text-neutral text-[10px] font-bold uppercase tracking-widest">
				{icon}
				<span>{label}</span>
			</div>
			<div className="group relative">
				<Info className="size-3.5 text-neutral/30 cursor-help" />
				<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-text text-text-opposite text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 shadow-xl border border-neutral/10">
					{info}
				</div>
			</div>
		</div>
		<div
			className={`text-lg font-bold ${success === true ? "text-success" : success === false ? "text-error" : "text-text"}`}
		>
			{value}
		</div>
	</Container>
);
