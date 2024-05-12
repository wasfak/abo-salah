import prisma from "@/lib/db/prisma";
import {
  createProductSchema,
  deleteProductSchema,
} from "@/lib/validation/note";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export const runtime = "edge";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const parseResult = createProductSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, price, images } = parseResult.data;
    console.log(title, price, images);

    const product = await prisma.product.create({
      data: {
        title,
        price,
        images,
        clerkId: userId,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
};

/* export const PUT = async (req: Request) => {
  try {
    const body = await req.json();

    const parseResult = updatePatientSchema.safeParse(body);

    if (!parseResult.success) {
      console.log(parseResult.error);

      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      id,
      fullName,
      age,
      gender,
      phoneNumber,
      email,
      address,
      emergencyContacts,
      medicalHistories,
      psychiatricHistories,
      intakeAssessments,
      additionalNotes,
      medicalCondition,
    } = parseResult.data;

    const note = await prisma.patient.findUnique({ where: { id } });

    if (!note) {
      return NextResponse.json(
        { error: "no patient to modify" },
        { status: 500 },
      );
    }
    const embedding = await getEmbeddingForNote(
      fullName || "",
      age || "",
      gender || "",
      phoneNumber || "",
      email || "",
      address || "",
      emergencyContacts || "",
      medicalHistories || "",
      psychiatricHistories || "",
      intakeAssessments || "",
      additionalNotes || "",
      medicalCondition || "",
    );

    const updatedNote = await prisma.$transaction(async (tx) => {
      const updatedNote = await prisma.patient.update({
        where: { id },
        data: {
          fullName,
          medicalCondition,
          age,
          gender,
          phoneNumber,
          email,
          address,
          emergencyContacts,
          medicalHistories,
          psychiatricHistories,
          intakeAssessments,
          additionalNotes,
        },
      });
      await noteIndex.upsert([
        {
          id,
          values: embedding,
          metadata: { userId },
        },
      ]);
      return updatedNote;
    });
    return NextResponse.json({ success: "Server Error" }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
};
 */
export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();

    const parseResult = deleteProductSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = parseResult.data;
    console.log(id);

    const note = await prisma.product.delete({ where: { id } });

    if (!note) {
      return NextResponse.json({ error: "no note to modify" }, { status: 500 });
    }

    return NextResponse.json({ message: "Note Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
};
