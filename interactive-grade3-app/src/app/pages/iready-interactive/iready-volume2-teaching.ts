export interface IReadyV2TeachingTrace {
  readonly sourcePage: number;
  readonly sourceFocus: string;
  readonly moves: readonly [string, string, string];
  readonly takeaway: string;
}

const trace = (
  sourcePage: number,
  sourceFocus: string,
  moves: readonly [string, string, string],
  takeaway: string
): IReadyV2TeachingTrace => ({ sourcePage, sourceFocus, moves, takeaway });

/**
 * Manually reviewed against the official Student Worktext Volume 2 lesson pages
 * and their mapped Teacher Guide Volume 2 spreads. This is deliberately keyed by
 * lesson and session; a model-family fallback would hide source drift.
 */
export const IREADY_V2_TEACHING_TRACE: Readonly<Record<string, IReadyV2TeachingTrace>> = {
  '20-1': trace(475, 'Identify the whole and the equal parts before naming one part.', ['Name the whole shown in the official model.', 'Check that every part has equal area.', 'Name one equal part with a unit fraction.'], 'A unit fraction names one equal part of one whole.'),
  '20-2': trace(479, 'Connect equal parts, the numerator, and the denominator.', ['Read the denominator as the number of equal parts in the whole.', 'Count the selected equal parts for the numerator.', 'Read the fraction as a number of same-size parts.'], 'The denominator fixes the part size; the numerator counts those parts.'),
  '20-3': trace(483, 'Use equal-area evidence to decide whether a model represents a fraction.', ['Identify the proposed whole.', 'Check whether its parts are equal in area.', 'Explain why the shaded amount does or does not name a fraction of that whole.'], 'A fraction model requires equal parts of the same whole.'),

  '21-1': trace(487, 'Connect a fraction strip to equal intervals from 0 to 1.', ['Use the strip to establish one whole.', 'Partition the distance from 0 to 1 into equal intervals.', 'Match each endpoint with the accumulated unit fractions.'], 'Equal parts of a whole become equal distances on a number line.'),
  '21-2': trace(491, 'Locate fractions by counting equal intervals, not tick marks.', ['Identify the denominator from the equal intervals in one whole.', 'Start at 0 and count intervals of that size.', 'Label the endpoint reached by the count.'], 'A point names the distance from 0 measured in equal fractional intervals.'),
  '21-3': trace(495, 'Read and justify fraction locations on a number line.', ['Check that the whole interval is identified.', 'Verify equal spacing between consecutive marks.', 'Use the interval count to justify each fraction label.'], 'The interval count, not the visual position alone, proves the fraction.'),

  '22-1': trace(499, 'Compare two partitions of the same-size whole.', ['Keep the wholes the same size.', 'Partition the wholes into different numbers of equal parts.', 'Compare the shaded lengths or areas directly.'], 'Equivalent fractions cover the same amount of the same-size whole.'),
  '22-2': trace(503, 'Use fraction models and number lines to show the same point.', ['Represent the first fraction on a same-size whole.', 'Partition the same whole into smaller equal parts.', 'Confirm that both fractions end at the same location.'], 'Equivalent fractions are different names for the same amount and point.'),
  '22-3': trace(507, 'Test an equivalence claim with a common whole.', ['Identify both denominators.', 'Build both partitions on the same-size whole.', 'Accept the claim only when the shaded amounts coincide.'], 'Matching numerals are not enough; the represented amounts must match.'),

  '23-1': trace(511, 'Find an equivalent fraction by repartitioning the same whole.', ['Model the given fraction.', 'Split every original part in the same way.', 'Count the new selected parts and all new equal parts.'], 'Repartitioning changes the fraction name without changing its value.'),
  '23-2': trace(515, 'Coordinate fraction strips and number lines to generate equivalents.', ['Mark the given endpoint.', 'Create a finer equal partition of the same whole interval.', 'Read the numerator and denominator at the unchanged endpoint.'], 'Equivalent fractions share one endpoint on the same number line.'),
  '23-3': trace(521, 'Compose unit fractions to write a whole number as a fraction.', ['Write one whole as denominator-over-denominator.', 'Repeat that whole the required number of times.', 'Count all unit-fraction parts across the wholes.'], 'A whole number can be written as a fraction whose numerator counts all equal parts.'),
  '23-4': trace(527, 'Interpret whole numbers as fractions with denominator 1.', ['Treat each whole as one part of size 1.', 'Count the whole-size parts.', 'Write the count over denominator 1.'], 'A denominator of 1 means each counted part is one whole.'),
  '23-5': trace(533, 'Choose and justify equivalent fraction names.', ['Identify the common whole.', 'Compare the represented amount in each partition.', 'State the equality only after the models or number-line points agree.'], 'Equivalent fractions must name the same quantity of the same whole.'),

  '24-1': trace(539, 'Compare fractions with a common model and verbal reasoning.', ['Check that the wholes are the same size.', 'Compare either equal-size parts or equal counts of parts.', 'Explain which represented amount is farther from 0 or closer to 1.'], 'A valid fraction comparison keeps the reference whole consistent.'),
  '24-2': trace(543, 'Use same-denominator and same-numerator reasoning.', ['With equal denominators, compare the number of parts.', 'With equal numerators, compare the size of each part.', 'Use a model to confirm the comparison.'], 'The comparison strategy depends on what the fractions have in common.'),
  '24-3': trace(547, 'Select a comparison strategy and justify it.', ['Look for a common denominator, numerator, or benchmark.', 'Represent the fractions on compatible models.', 'State the relation and the evidence supporting it.'], 'The symbol is the conclusion; the model and reasoning justify it.'),

  '25-1': trace(551, 'Translate a visual comparison into <, >, or =.', ['Compare the fractions using same-size wholes.', 'Read the relation from left to right.', 'Choose the symbol whose open side faces the greater number.'], 'Comparison symbols record a relationship already established by the quantities.'),
  '25-2': trace(555, 'Compare fractions using symbols and more than one representation.', ['Identify a useful comparison strategy.', 'Check the relationship with strips or a number line.', 'Write the complete comparison statement.'], 'The same comparison must hold in every accurate representation.'),
  '25-3': trace(561, 'Evaluate and correct fraction comparison statements.', ['Read the two fractions and the proposed symbol.', 'Test the claim with a common whole or benchmark.', 'Correct the symbol when the represented relation disagrees.'], 'A comparison statement is true only when both the quantities and symbol agree.'),

  '26-1': trace(567, 'Measure objects to the nearest unit and plot each result.', ['Align one end of each object with zero on the ruler.', 'Read each length at the other endpoint.', 'Place one X above the matching value on the line plot.'], 'Each measurement becomes one data mark at its exact labeled value.'),
  '26-2': trace(571, 'Measure lengths to the nearest quarter inch.', ['Use the ruler subdivisions to identify quarter-inch units.', 'Record each object length precisely.', 'Check that the unit label stays attached to the measurement.'], 'Accurate plotting begins with accurate, consistently measured data.'),
  '26-3': trace(577, 'Build a line plot from a table of measured lengths.', ['Create a scale that includes every recorded value.', 'Place one X for each object at its value.', 'Stack repeated values without changing their horizontal location.'], 'The height of each stack shows frequency; its horizontal position shows length.'),
  '26-4': trace(583, 'Interpret a completed line plot and compare its values.', ['Read the key to determine what each X represents.', 'Count marks at individual values or across an interval.', 'Use the plotted values to answer comparison questions.'], 'A line plot preserves both the measurement values and how often they occur.'),

  '27-1': trace(609, 'Coordinate the analog hands with an exact digital time.', ['Read the hour hand relative to the neighboring hours.', 'Count minute marks from the 12.', 'Attach a.m. or p.m. from the situation.'], 'An exact time combines the hour position, minute count, and time-of-day context.'),
  '27-2': trace(613, 'Tell time to the minute from analog clock models.', ['Locate the minute hand and count minute marks.', 'Locate the hour hand between the correct hours.', 'Write the matching digital time.'], 'Both hands must be read together to name the time correctly.'),
  '27-3': trace(619, 'Find an end time by adding elapsed minutes in manageable jumps.', ['Mark the start time.', 'Advance to a friendly hour or half hour.', 'Add the remaining minutes and read the endpoint.'], 'Elapsed-time jumps must total the full duration and land on the end time.'),
  '27-4': trace(625, 'Find a start time by working backward from the end time.', ['Mark the known end time.', 'Subtract the elapsed minutes in useful jumps.', 'Read and check the starting endpoint.'], 'Working backward reverses the elapsed-time interval without changing its length.'),
  '27-5': trace(631, 'Find elapsed time by splitting the interval at a friendly hour.', ['Mark the official start and end times, 9:40 a.m. and 10:32 a.m.', 'Count 20 minutes to 10:00, then 32 more minutes to 10:32.', 'Add the two elapsed-time parts and verify that the total spans the complete interval.'], 'Twenty minutes before 10:00 plus 32 minutes after 10:00 gives a total elapsed time of 52 minutes.'),

  '29-1': trace(659, 'Use a one-gram benchmark and a balance to estimate mass.', ['Choose a benchmark with a known mass.', 'Add equal benchmark objects until the balance is level.', 'Use the benchmark count to estimate grams.'], 'A balance compares mass; the repeated benchmark supplies the measurement unit.'),
  '29-2': trace(663, 'Estimate heavier objects with a one-kilogram benchmark.', ['Select a kilogram benchmark appropriate for the object.', 'Compare several benchmark masses with the target object.', 'State a reasonable estimate and then compare it with the measured mass.'], 'The benchmark unit should fit the scale of the object being estimated.'),
  '29-3': trace(669, 'Solve mass word problems by identifying the relationship first.', ['Identify the known masses and the requested quantity.', 'Choose addition, subtraction, multiplication, or division from the relationship.', 'Compute and label the answer in grams or kilograms.'], 'The context determines the operation; the measurement unit remains attached.'),
  '29-4': trace(675, 'Select gram or kilogram benchmarks and solve mixed mass problems.', ['Decide whether the object is light enough for grams or heavier enough for kilograms.', 'Use the stated benchmark or measured values.', 'Check the reasonableness and unit of the result.'], 'A mass answer is incomplete without a sensible unit and benchmark.'),

  '30-1': trace(701, 'Describe shapes with observable side and angle attributes.', ['Count sides and vertices carefully.', 'Notice equal sides, parallel sides, and right angles.', 'Group shapes that share the stated attributes.'], 'A category is defined by attributes, not by the direction or appearance of a drawing.'),
  '30-2': trace(705, 'Compare shapes that share some attributes and differ in others.', ['Name an attribute shared by the selected shapes.', 'Name an attribute that distinguishes them.', 'Sort each shape using only verified side and angle evidence.'], 'Shapes can belong together for one attribute and separate for another.'),
  '30-3': trace(709, 'Evaluate shape-category statements with counterexamples and evidence.', ['Identify the attribute named in the claim.', 'Check every relevant shape against that attribute.', 'Explain whether the claim always, sometimes, or never holds.'], 'Category reasoning requires evidence that applies to every shape in the claim.'),

  '31-1': trace(713, 'Classify quadrilaterals by side, angle, and parallel-line attributes.', ['Confirm that the shape has four sides.', 'Identify equal sides, right angles, and parallel pairs.', 'Place the shape in every category whose attributes it satisfies.'], 'One quadrilateral can belong to more than one category.'),
  '31-2': trace(717, 'Compare squares, rectangles, rhombuses, and other quadrilaterals.', ['Record the attributes of each shape.', 'Identify which attributes are shared.', 'Use the differences to refine the classification.'], 'Specific quadrilateral categories inherit the attributes of broader categories.'),
  '31-3': trace(723, 'Name and draw quadrilaterals from stated attributes.', ['Translate the condition into required sides and angles.', 'Draw a four-sided figure that satisfies every condition.', 'Check the drawing and name all categories it belongs to.'], 'A valid drawing must satisfy the attributes, not merely resemble a familiar prototype.'),
  '31-4': trace(729, 'Apply the quadrilateral hierarchy to unfamiliar orientations and shapes.', ['Ignore rotation and size.', 'Check the defining attributes directly.', 'Justify each category name with side, angle, or parallel-line evidence.'], 'Classification remains unchanged when a figure is turned, resized, or drawn unusually.'),

  '32-1': trace(735, 'Distinguish area from perimeter on the same figure.', ['Trace the outside boundary for perimeter.', 'Count or multiply square units for area.', 'Label perimeter in linear units and area in square units.'], 'Area measures covering; perimeter measures the distance around.'),
  '32-2': trace(739, 'Use perimeter and known side lengths to find an unknown side.', ['Write the total perimeter as the sum of all side lengths.', 'Subtract the known lengths from the total.', 'Check by adding every side, including the unknown.'], 'The missing side must make the complete boundary equal the stated perimeter.'),
  '32-3': trace(745, 'Compare rectangles with the same area and different perimeters.', ['Build factor pairs for the same area.', 'Find each rectangle’s perimeter from its side lengths.', 'Compare the boundary totals.'], 'Equal area does not require equal perimeter.'),
  '32-4': trace(751, 'Compare rectangles with the same perimeter and different areas.', ['Choose side lengths whose doubled sum is the same perimeter.', 'Find each area by multiplying its side lengths.', 'Compare the covered square units.'], 'Equal perimeter does not require equal area.'),
  '32-5': trace(757, 'Choose area or perimeter from the quantity asked for.', ['Identify whether the problem concerns covering or boundary length.', 'Use the relevant dimensions and operation.', 'Check both the numerical result and its unit.'], 'The situation determines the measure; the unit confirms the choice.'),

  '33-1': trace(763, 'Partition a shape into equal-area parts and name one part.', ['Identify the entire shape as the whole.', 'Create the required number of equal areas.', 'Name one part with a unit fraction.'], 'Equal-area parts can look different yet represent equal fractions of the same whole.'),
  '33-2': trace(767, 'Relate rows, columns, and grouped pieces to equal fractional parts.', ['Count all equal pieces in the whole.', 'Identify the pieces in one equal group.', 'Write and simplify the fraction for that group when the model supports it.'], 'A group of smaller equal pieces can compose one larger fractional part.'),
  '33-3': trace(773, 'Judge and construct partitions with equal areas.', ['Compare the area of every proposed part.', 'Reject partitions whose regions are unequal.', 'Revise or create a partition that satisfies the required fraction.'], 'Fractional parts are defined by equal area, not identical shape.'),
};
