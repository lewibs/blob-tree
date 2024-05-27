const {BlobTree, Blob, Node} = require("./BlobTree")


test('test the distanceTo function in Node:', () => {
    const node3A = new Node([0,0,0], "node3A")
    const node3B = new Node([1,1,1], "node3B")
    const node3C = new Node([0,0,1], "node3C")
  
    expect(node3A.distanceTo(node3B.vector)).toBe(1.7320508075688772);
    expect(node3A.distanceTo(node3C.vector)).toBe(1);
});

describe("BlobTree", ()=>{
    test("getNearestBlob", ()=>{
        const blobtree = new BlobTree(1, 5);
        const points = [
            {vec:[0], value:"a"},
            {vec:[3], value:"b"},
            {vec:[4], value:"c"},
            {vec:[8], value:"d"},
            {vec:[-2], value:"e"},
            {vec:[10], value:"f"},
            {vec:[11], value:"g"},
            {vec:[5], value:"h"},
        ];

        let [blob1] = blobtree.add(points[0].vec, points[0]);
        let res = blobtree.getNearestBlob([0]);
        expect(res[0]).toEqual(blob1)
        res = blobtree.getNearestBlob([2]);
        expect(res[0]).toEqual(blob1)
        res = blobtree.getNearestBlob([3]);
        expect(res[0]).toEqual(blob1)
        res = blobtree.getNearestBlob([-1]);
        expect(res[0]).toEqual(blob1)
        res = blobtree.getNearestBlob([-2]);
        expect(res[0]).toEqual(blob1)
        blobtree.add(points[1].vec, points[1]);
        res = blobtree.getNearestBlob([4]);
        expect(res[0]).toEqual(blob1)
        blobtree.add(points[2].vec, points[2]);
        let [blob2] = blobtree.add(points[3].vec, points[3]);
        let [blob] = blobtree.add(points[4].vec, points[4]);
        expect(blob).toEqual(blob1)
        res = blobtree.add(points[5].vec, points[5]);
        expect(res[0]).toEqual(blob2)
    })
    
    test("add", ()=>{
        const blobtree = new BlobTree(2, 10);

        const points = [
            {vec:[0,0], value:"a"},
            {vec:[5,5], value:"b"},
            {vec:[4,5], value:"c"},
            {vec:[2,1], value:"d"},
            {vec:[18,18], value:"e"},
            {vec:[18,18], value:"f"},
            {vec:[18,18], value:"g"},
            {vec:[18,18], value:"h"},
        ].map((point)=>{
            blobtree.add(point.vec, point);
            return point
        });

        expect(blobtree.length).toBe(2)

        let sum = 0;

        for (let i = 0; i < blobtree.blobs.length; i++) {
            sum += blobtree.blobs[i].length;
        }

        expect(sum).toBe(points.length);
    })
})