import { Shape, ExtrudeBufferGeometry, ShapeBufferGeometry } from "three";

export function createBoxWithRoundedEdges(
    width,
    height,
    depth,
    radius0,
    smoothness
) {
    let shape = new Shape();
    let eps = 0.00001;
    let radius = radius0 - eps;
    shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
    shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
    shape.absarc(
        width - radius * 2,
        height - radius * 2,
        eps,
        Math.PI / 2,
        0,
        true
    );
    shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
    let geometry = new ExtrudeBufferGeometry(shape, {
        depth: depth - radius0 * 2,
        bevelEnabled: true,
        bevelSegments: smoothness * 2,
        steps: 1,
        bevelSize: radius,
        bevelThickness: radius0,
        curveSegments: smoothness,
    });

    geometry.center();

    return geometry;
}

export function rotateAboutPoint(obj, point, axis, theta) {
    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset
    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

export function createRoundRect(width, height, radius) {
    let shape = new Shape();
    shape.absarc(
        -width / 2 + radius,
        -height / 2 + radius,
        radius,
        -Math.PI / 2,
        -Math.PI,
        true
    );
    shape.absarc(
        -width / 2 + radius,
        height / 2 - radius,
        radius,
        Math.PI,
        Math.PI / 2,
        true
    );
    shape.absarc(
        width / 2 - radius,
        height / 2 - radius,
        radius,
        Math.PI / 2,
        0,
        true
    );
    shape.absarc(
        width / 2 - radius,
        -height / 2 + radius,
        radius,
        0,
        -Math.PI / 2,
        true
    );
    const geometry = new ShapeBufferGeometry(shape, 5);
    geometry.center();
    return geometry;
}
