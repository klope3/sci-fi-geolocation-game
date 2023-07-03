import { z } from "zod";

const artifactTypes = [
  "lens",
  "chalice",
  "tablet",
  "wire",
  "orb",
  "sculpture",
  "mirror",
] as const;
const artifactMaterialNames = [
  "quartz",
  "resin",
  "ceramic",
  "polymer",
  "fiber",
  "titanium",
  "aluminum",
] as const;
const artifactMaterialModifiers = [
  "bio",
  "plasmic",
  "quantum",
  "micro",
] as const;
const artifactColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "brown",
  "silver",
  "white",
  "black",
  "clear",
  "turquoise",
  "pink",
] as const;
const artifactAges = ["ancient", "old", "recent"] as const;
const artifactSizes = [
  "massive",
  "large",
  "medium-sized",
  "small",
  "microscopic",
] as const;
const artifactStates = [
  "pristine",
  "weathered",
  "damaged",
  "decayed",
  "ruined",
] as const;
const artifactSpecials = [
  "antigravity",
  "magnetic",
  "alien markings",
  "temporal distortions",
] as const;

const artifactTypeSchema = z.enum(artifactTypes);
const artifactMaterialNameSchema = z.enum(artifactMaterialNames);
const artifactMaterialModifierSchema = z.enum(artifactMaterialModifiers);
const artifactColorSchema = z.enum(artifactColors);
const artifactAgeSchema = z.enum(artifactAges);
const artifactSizeSchema = z.enum(artifactSizes);
const artifactStateSchema = z.enum(artifactStates);
const artifactSpecialSchema = z.enum(artifactSpecials);

type ArtifactType = z.infer<typeof artifactTypeSchema>;
type ArtifactMaterialName = z.infer<typeof artifactMaterialNameSchema>;
type ArtifactMaterialModifier = z.infer<typeof artifactMaterialModifierSchema>;
type ArtifactColor = z.infer<typeof artifactColorSchema>;
type ArtifactAge = z.infer<typeof artifactAgeSchema>;
type ArtifactSize = z.infer<typeof artifactSizeSchema>;
type ArtifactState = z.infer<typeof artifactStateSchema>;
type ArtifactSpecial = z.infer<typeof artifactSpecialSchema>;

export type Artifact = {
  type: ArtifactType;
  material: {
    name: ArtifactMaterialName;
    modifier?: ArtifactMaterialModifier;
  };
  color: ArtifactColor;
  age: ArtifactAge;
  size: ArtifactSize;
  state: ArtifactState;
  special?: ArtifactSpecial;
};
