import { fetchAndReturnInput } from '../inputs/fetcher.ts'

class InstructionSet {
  instructions: Map<number, string> = new Map();
  nodes: Map<string, Map<string, string>> = new Map();
  constructor(instuctions: string[] = [], nodes: Map<string, Map<string, string>> = new Map()) {
    this.nodes = nodes;
    instuctions.forEach((instruction) => {
      const c = instruction.split('');
      c.forEach((char, i) => {
        this.instructions.set(i, char);
      });
    });

  }
}


const parseInput = (input: string): InstructionSet => {
  const instructions: string[] = [];
  const nodes: Map<string, Map<string, string>> = new Map();
  const i = input.split('\n');
  i.forEach((instruction) => {
    if (instruction.length !== 16 && instruction !== '') {
      instructions.push(instruction);
    }
    if (instruction.length === 16) {
      const node = instruction.match(/[a-zA-Z0-9]{3}/gi);
      const nodeMap = new Map();
      nodeMap.set(node![1], node![2]);
      nodes.set(node![0], nodeMap);
    }
  });
  return new InstructionSet(instructions, nodes);
}

const traverseMap = (instructionSet: InstructionSet): number => {
  let currentNode = instructionSet.nodes.get('AAA');
  let steps = 0;
  let foundZZZ = false;
  let instructionNr = 0;
  let currentInstruction = instructionSet.instructions.get(instructionNr);

  while (!foundZZZ) {
    const nodeKey = Array.from(currentNode!.keys());
    const nodeValue = Array.from(currentNode!.values());
    const nextNodeKey = currentInstruction === 'L' ? nodeKey[0] : nodeValue[0];
    if (instructionNr + 1 > instructionSet.instructions.size - 1) {
      instructionNr = 0;
    } else {
      instructionNr++;
    }
    currentInstruction = instructionSet.instructions.get(instructionNr);
    const nextNode = instructionSet.nodes.get(nextNodeKey)
    if (nextNode === undefined) {
      break;
    }
    if (nextNodeKey === 'ZZZ') {
      steps++;
      foundZZZ = true;
      break;
    }
    currentNode = instructionSet.nodes.get(nextNodeKey);
    steps++;
  }

  return steps;
}
const traverseMapForPart2 = (instructionSet: InstructionSet): number => {
  const startingNodes = Array.from(instructionSet.nodes.keys()).filter(node => node.endsWith('A'));
  let currentNodes = startingNodes;

  let steps = 0;
  let instructionNr = 0;
  let currentInstruction = instructionSet.instructions.get(instructionNr);

  while (!currentNodes.every(node => node.endsWith('Z'))) {
    const nextNodes: string[] = [];
    console.log('currentNodes', currentNodes);
    currentNodes.forEach((node, index) => {
      const currentNode = instructionSet.nodes.get(node);
      console.log(currentNode);
      const nodeKey = Array.from(currentNode!.keys());
      const nodeValue = Array.from(currentNode!.values());
      const nextNodeKey = currentInstruction === 'L' ? nodeKey[0] : nodeValue[0];
      if (instructionNr + 1 > instructionSet.instructions.size - 1) {
        if (index === currentNodes.length - 1) {
          instructionNr = 0;
        }
      } else {
        if (index === currentNodes.length - 1) {
          instructionNr++;

        }
      }
      currentInstruction = instructionSet.instructions.get(instructionNr);
      const nextNode = instructionSet.nodes.get(nextNodeKey)
      if (nextNode === undefined) {
        return;
      }

      nextNodes.push(nextNodeKey);
    });
    currentNodes = nextNodes;
    steps++;
  }

  return steps;
}


export const solvePart1 = (input: string): number => {
  const instructions = parseInput(input);
  const steps = traverseMap(instructions);
  return steps;
}
export const solvePart2 = (input: string): number => {
  const instructions = parseInput(input);
  const steps = traverseMapForPart2(instructions);
  return steps;
}
// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = await fetchAndReturnInput();

  console.log("part 1: ", solvePart1(input!));
  console.log("part 1: ", solvePart2(input!));
}
