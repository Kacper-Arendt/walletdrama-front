import {
	Em,
	H1,
	H2,
	H3,
	H4,
	InlineCode,
	Large,
	Lead,
	List,
	MultilineCode,
	Muted,
	P,
	Quote,
	Small,
	Strong,
} from "@ui/components/typography";

export default async function Home() {
	return (
		<div className="flex flex-col gap-2">
			<H1>H1 Heading</H1>
			<H2>H2 Heading</H2>
			<H3>H3 Heading</H3>
			<H4>H4 Heading</H4>
			<Lead>Lead text</Lead>
			<P>P Paragraph text</P>
			<Large>Large text</Large>
			<Small>Small text</Small>
			<Muted>Muted text</Muted>
			<InlineCode>Inline code</InlineCode>
			<MultilineCode>
				{`const x = 1;
console.log(x);`}
			</MultilineCode>
			<List>
				<li>List item 1</li>
				<li>List item 2</li>
			</List>
			<Quote>Quote text</Quote>
			<Strong>Strong text</Strong>
			<Em>Emphasized text</Em>
		</div>
	);
}
